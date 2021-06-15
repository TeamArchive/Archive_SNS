import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getConnection } from 'typeorm'

import { ChatGroupRepo, PostGroupRepo, GroupRepoImpl, GroupParticipantRepo } from '@group/group.repo';
import { Group, ChatGroup, PostGroup, GroupParticipant } from '@group/group.entity';
import { GroupDTO, GroupParticipantDTO } from '@group/group.dto';

import { AccountService } from '@account/account.service';

type ET = (ChatGroup | PostGroup);
type RT = (ChatGroupRepo | PostGroupRepo) & GroupRepoImpl<ET>;

abstract class GroupServiceImpl <RepoType extends RT,EntType extends ET> {

	// Repositories
	protected group_repo : RepoType;
	protected account_service : AccountService;
	protected group_participant_repo : GroupParticipantRepo;

	// Minimum number of first members
	// 그룹 생성 시 최소 인원수 제한
	protected n_min_early_member = 1;

	constructor(
		group_repo: RepoType,
		group_participant_repo: GroupParticipantRepo,
		account_service: AccountService,
	) {
		this.group_repo = group_repo;
		this.account_service = account_service;
		this.group_participant_repo = group_participant_repo;
	}

	
	/**
	 * Create Group
	 * 그룹 생성
	 * 
	 * @param creater_pk : Creater's account pk
	 * @param group_dto : Group DTO which have Data of the group to be created
	 * @returns Created group entity ( if error occurred -> return undefined)
	 */
	public async create(
		creater_pk: string,
		dto: GroupDTO,
	): Promise <EntType | undefined> {
		// await getManager().transaction(async (transactionalEntityManager) => {
		//     await this.boardRepository.deleteBoardsByUserId(transactionalEntityManager, userId)
		//     await this.userRepository.deleteUserByUserId(transactionalEntityManager, userId)
		// }).catch((err) => {
		//     throw err
		// })

		// @TODO : Regist Creater

		/**
		 * < Check is satisfied with min number of first members >
		 */

		const is_exist_creater = dto.member_pk_list.indexOf(creater_pk);
		if(is_exist_creater == -1) 
			dto.member_pk_list.push(creater_pk);

		if(dto.member_pk_list.length < this.n_min_early_member)
			return undefined;

		/**
		 * < Check is account exist >
		 */
		const account = await this.account_service.findByIds(dto.member_pk_list);
		if (!account)
			return undefined;	// if not exist -> do not create group

		/**
		 * < Create new group >
		 */
		const group_ent	= GroupDTO.toEntity(dto);
		const group 	= await this.group_repo.save(group_ent);

		/**
		 * < Put members in the group >
		 */
		await this.group_participant_repo.newParticipant(
			group.pk,
			dto.member_pk_list,
			[dto?.lowest_rank, dto?.highest_rank],
			creater_pk
		);

		return group as EntType;
	}



	public async update(
		admin_pk: String,
		dto: GroupDTO
	) : Promise <Group | number> {

		/**
		 * < Check -> is real admin >
		 */
		const {admin, group} = await this.isAdmin({
			participant_pk: admin_pk,
			group_pk: dto.group_pk
		} as GroupParticipantDTO );

		if (!group)
			return 404;

		if (!admin)
			return 401;
		
		const target = { entity : group };
		GroupDTO.updateEntity(target, dto);

		return await this.group_repo.save(target.entity);
	}



	/**
	 * Invite to the group
	 * 그룹으로 초대
	 * 
	 * @param sender_pk : Invite sender's PK
	 * @param group_dto : Group DTO
	 * @returns return the Group entity; if not processed successfully return state code
	 */
	public async invite(
		sender_pk: String,
		dto: GroupDTO
	) : Promise <GroupParticipant[] | number> {

		const { group_pk, member_pk_list } = dto;
		if (!group_pk) return undefined;

		/**
		 * < Check is group and account exist >
		 */
		const group = await this.group_repo.findOne({ where: { pk: group_pk } });
		if (!group)
			return 404;

		const account = await this.account_service.findByIds(member_pk_list);
		if (!account)
			return 404;

		/**
		 * < Check is serder in the group >
		 */
		const participant = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: sender_pk, 
				group_pk: dto.group_pk
		}});
		if (!participant)	return 401;

		/**
		 * < Put members in the group >
		 */
		return await this.group_participant_repo.newParticipant(
			group_pk,
			member_pk_list
		);
	}

	/**
	 * Exit Group
	 * 그룹 나가기
	 * 
	 * @param dto : Group participant DTO
	 * @return Return true if the operation was successful, if not return false
	 */
	public async exit ( dto: GroupParticipantDTO ) : Promise<boolean> {

		/**
		 * < Check is participant exist >
		 */
		const participant = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: dto.participant_pk, 
				group_pk: dto.group_pk 
		}});
		
		if (!participant)	return false;

		/**
		 * < Exit Group >
		 */
		const result = this.group_participant_repo.remove(participant);

		// @TODO : 다 나갔을 시 그룹 제거
		
		return true;
	}

	/**
	 * Participant's Rank Update
	 * 참가자의 등급 바꾸기
	 * 
	 * @param admin_pk : admin's pk
	 * @param dto : Group participant DTO
	 * @returns if changed successfully, return entity. if not return status code
	 */
	public async updateRank ( 
		admin_pk: string,
		dto: GroupParticipantDTO 
	) : Promise <GroupParticipant | number> {

		/**
		 * < Check -> is real admin >
		 */
		const {admin, group} = await this.isAdmin({
			participant_pk: admin_pk,
			group_pk: dto.group_pk
		} as GroupParticipantDTO );
		if (!admin)
			return 401;
		
		/**
		 * < Check -> is account exist in the group >
		 */
		const participant = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: dto.participant_pk, 
				group_pk: dto.group_pk 
		}});
		if (!participant)
			return 404;

		/**
		 * < Check -> target rank in currect range >
		 */
		if(group.lowest_rank > dto.rank || dto.rank > group.highest_rank) 
			return undefined;
		
		participant.rank = dto.rank;

		return await this.group_participant_repo.save(participant);
	}

	/**
	 * Group Search
	 * 그룹 검색
	 * 
	 * @param query 
	 * @returns Result Group List
	 */
	public async search(query: string) : Promise <Group[]> {
		return this.group_repo.search(query);
	}

	/**
	 * is who participant in the group 
	 * 그룹에 참가자가 존재하는지 체크
	 * 
	 * @param dto Group Participant DTO
	 * @returns if account is exist in the group, return entity, if not return undefined
	 */
	public async isParticipant(
		dto: GroupParticipantDTO 
	) : Promise <GroupParticipant | undefined> {
		const participant = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: dto.participant_pk, 
				group_pk: dto.group_pk 
		}});
		if (!participant)
			return undefined;

		return participant
	}

	public async isAdmin ( dto: GroupParticipantDTO ) {

		/**
		 * < Find group for get rank info >
		 */
		const group = await this.group_repo.findOne({
			where: { pk: dto.group_pk } 
		});
		if (!group)	
			return { admin: undefined, group: undefined };
		
		/**
		 * < Find Paticipant and Check >
		 */
		const admin = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: dto.participant_pk, 
				group_pk: dto.group_pk
		}});
		if (!admin || admin.rank < group.highest_rank)	
			return { admin: undefined, group: group };

		return { admin: admin, group: group };
	}

}



/**
 * Post Group Service
 * 글쓰기 그룹의 서비스
 * 
 * Code Link :
 * 	{@link GroupService}
 */
@Injectable()
export class PostGroupService extends GroupServiceImpl<PostGroupRepo, PostGroup> {

	constructor(
		@InjectRepository(PostGroup) group_repo: PostGroupRepo,
		group_participant_repo: GroupParticipantRepo,
		account_service: AccountService,
	) {
		super(group_repo, group_participant_repo, account_service);
	}

	/**
	 * Delete Group
	 * 그룹 삭제
	 * 
	 * @param dto : Group participant DTO ( Target Group, Creater's PK )
	 * @returns if deleted successfully return true, if not return false
	 */
	public async delete ( dto: GroupParticipantDTO ) : Promise <boolean> {

		/**
		 * < Check is real admin's PK && is group exist >
		 */
		const group = await this.group_repo.findOne({
			where: { pk: dto.group_pk }
		});
		if (!group)		return false;

		const creater = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: dto.participant_pk, 
				group_pk: dto.group_pk
		}});

		if (!creater || !creater.is_creater)
			return false;

		/**
		 * < Delete Group >
		 */
		await this.group_repo.delete(group);

		return true;
	}

}



/**
 * Chat Group Service
 * 채팅 그룹의 서비스
 * 
 * Code Link :
 * 	{@link GroupService}
 */
@Injectable()
export class ChatGroupService extends GroupServiceImpl<ChatGroupRepo, ChatGroup> {

	constructor(
		@InjectRepository(ChatGroup) group_repo: ChatGroupRepo,
		group_participant_repo: GroupParticipantRepo,
		account_service: AccountService,
	) {
		super(group_repo, group_participant_repo, account_service);
		this.n_min_early_member = 1;
	}

}