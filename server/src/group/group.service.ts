import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getConnection } from 'typeorm'

import { GroupRepo, ChatGroupRepo, PostGroupRepo, GroupRepoImpl, GroupParticipantRepo } from '@group/group.repo';
import { Group, ChatGroup, PostGroup, GroupParticipant } from '@group/group.entity';
import { GroupDTO, GroupParticipantDTO } from '@group/group.dto';

import { AccountRepo } from '@account/account.repo'

type ET	= (ChatGroup | PostGroup);
type RT = (ChatGroupRepo | PostGroupRepo) & GroupRepoImpl<ET>;

abstract class GroupServiceImpl <RepoType extends RT,EntType extends ET> {

	// Repositories
	protected group_repo : RepoType;
	protected account_repo : AccountRepo;
	protected group_participant_repo;

	// Minimum number of first members
	// 그룹 생성 시 최소 인원수 제한
	protected n_min_early_member = 2;

	constructor(
		group_repo: RepoType,
		account_repo: AccountRepo,
		group_participant_repo: GroupParticipantRepo
	) {
		this.group_repo = group_repo;
		this.account_repo = account_repo;
		this.group_participant_repo = GroupParticipantRepo;
	}

	
	/**
	 * Create Group
	 * 그룹 생성
	 * 
	 * @param creater_account_pk : Creater's account pk
	 * @param group_dto : Group DTO which have Data of the group to be created
	 * @returns Created group entity ( if error occurred -> return undefined)
	 */
	public async create(
		creater_account_pk: string,
		group_dto: GroupDTO,
	): Promise <EntType | undefined> {
		// await getManager().transaction(async (transactionalEntityManager) => {
		//     await this.boardRepository.deleteBoardsByUserId(transactionalEntityManager, userId)
		//     await this.userRepository.deleteUserByUserId(transactionalEntityManager, userId)
		// }).catch((err) => {
		//     throw err
		// })

		/**
		 * < Check is satisfied with min number of first members >
		 */
		const { member_pk_list } = group_dto;
		if(member_pk_list.length < this.n_min_early_member)
			return undefined;

		/**
		 * < Check is account exist >
		 */
		const account = await this.account_repo.FindByPKs(member_pk_list);
		if (!account)
			return undefined;	// if not exist -> do not create group

		/**
		 * < Create new group >
		 */
		const group_ent = group_dto.toEntity() as EntType;
		const group = await this.group_repo.save(group_ent);

		/**
		 * < Put members in the group >
		 */
		const result = await this.group_participant_repo.newParticipant(
			group.pk,
			group_dto.member_pk_list,
			group_dto?.lowest_rank
		);

		return result;
	}


	/**
	 * Invite to the group
	 * 그룹으로 초대
	 * 
	 * @param sender_pk : Invite sender's PK
	 * @param group_dto : Group DTO
	 * @returns return the Group entity; if not processed successfully return undefined
	 */
	public async invite(
		sender_pk: String,
		group_dto: GroupDTO
	) : Promise <EntType | undefined> {
		const { group_pk, member_pk_list } = group_dto;
		if (!group_pk) return undefined;

		/**
		 * < Check is group and account exist >
		 */
		const group = await this.group_repo.findOne({ where: { pk: group_pk } });
		if (!group)
			return undefined;

		const account = await this.account_repo.findByIds(member_pk_list);
		if (!account)
			return undefined;

		/**
		 * < Put members in the group >
		 */
		const result = await this.group_participant_repo.newParticipant(
			group_pk,
			member_pk_list
		);

		return result;
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
		const participant = await this.account_repo.findOne({
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
	 * @returns 
	 */
	public async updateRank ( 
		admin_pk: string,
		dto: GroupParticipantDTO 
	) : Promise <EntType | undefined> {
		/**
		 * < Check is participant exist >
		 */
		const group = await this.group_repo.findOne({
			where: { pk: dto.group_pk } 
		});
		if (!group)	
			return undefined;

		const admin = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: admin_pk, 
				group_pk: group.pk
		}});

		// check is target rank in range
		if (!admin || admin.rank == group.highest_rank)	
			return undefined;
			
		const participant = await this.group_participant_repo.findOne({
			where: { 
				participant_pk: dto.participant_pk, 
				group_pk: dto.group_pk 
		}});
		if (!participant)
			return undefined;

		/**
		 * < Check is real admin >
		 */
		if(group.lowest_rank > dto.rank || dto.rank < group.highest_rank )
			return undefined;
		
		participant.rank = dto.rank;

		return await this.account_repo.save(participant);
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
		@InjectRepository(GroupParticipant) group_participant_repo: GroupParticipantRepo,
		account_repo: AccountRepo,
	) {
		super(group_repo, account_repo, group_participant_repo);
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

		const creater = this.group_participant_repo.findOne({
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
		@InjectRepository(GroupParticipant) group_participant_repo: GroupParticipantRepo,
		account_repo: AccountRepo,
	) {
		super(group_repo, account_repo, group_participant_repo);
		this.n_min_early_member = 2;
	}

}