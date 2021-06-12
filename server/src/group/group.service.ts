import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getConnection } from 'typeorm'

import { ChatGroupRepo, PostGroupRepo, GroupParticipantRepo } from './group.repo';
import { Group, ChatGroup, PostGroup } from './group.entity';
import { GroupDTO } from './group.dto';

type RT = (ChatGroupRepo | PostGroupRepo)	
type ET	= (ChatGroup | PostGroup)

abstract class GroupService < RepoType extends RT, EntType extends ET > {

	// Repositories
	protected group_repo : RepoType;
	protected account_repo : UserRepo;
	protected group_participant_repo;

	// Minimum number of first members
	// 그룹 생성 시 최소 인원수 제한
	protected n_min_early_member = 2;

	constructor(
		group_repo: RepoType,
		user_repo: UserRepo,
		group_participant_repo: GroupParticipantRepo
	) {
		this.group_repo = group_repo;
		this.account_repo = user_repo;
		this.group_participant_repo = GroupParticipantRepo;
	}

	
	/**
	 * Create Group
	 * 그룹 생성 서비스
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
		const new_group = group_dto.toEntity() as EntType;
		const result = await this.group_repo.save(new_group);

		/**
		 * < Put members in the group >
		 */
		this.group_participant_repo.newParticipant(
			result.pk,
			group_dto.member_pk_list,
			group_dto?.lowest_rank
		);

		return result;
	}


	/**
	 * Delete Group
	 * 그룹 삭제
	 * 
	 * @param group_pk : Target Group's PK
	 * @param creater_pk : Target group creater's PK
	 * @returns if deleted successfully return true, if not return false
	 */
	public async delete(
		group_pk: string,
		creater_pk: string,
	): Promise <boolean> {

		/**
		 * < Check is PK admin's PK && is group exist >
		 */
		const target = await this.group_repo.findOne({
			where: { pk: group_pk }
		});

		this.group_participant_repo.findMany({
			where: { participant_pk: creater_pk, group_pk }
		});

		/**
		 * < Delete Group >
		 */
		await this.group_repo.delete(target);
		return true;
	}


	/**
	 * Invite to the group
	 * 그룹으로 초대
	 * 
	 * @param group_dto 
	 * @returns return the Group entity; if not processed successfully return undefined
	 */
	public async invite(
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

		const account = await this.account_repo.FindByPKs(member_pk_list);
		if (!account)
			return undefined;

		/**
		 * < Put members in the group >
		 */
		await this.group_participant_repo.newParticipant(
			group_pk,
			member_pk_list
		);

		return group;
	}

	/**
	 * Group Search
	 * 그룹 검색
	 * 
	 * @param query 
	 * @returns Result Group List
	 */
	public async search(query: string) : Promise <Group[]> {
		return this.group_repo.searchGroup(query);
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
export class ChatGroupService extends GroupService<ChatGroupRepo, ChatGroup> {

	constructor(
		@InjectRepository(ChatGroupRepo) group_repo: ChatGroupRepo,
		@InjectRepository(UserRepo) user_repo: UserRepo,
		@InjectRepository(GroupParticipantRepo) group_participant_repo: GroupParticipantRepo
	) {
		super(group_repo, user_repo, group_participant_repo);
		this.n_min_early_member = 2;
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
export class PostGroupService extends GroupService<PostGroupRepo, PostGroup> {

	constructor(
		@InjectRepository(PostGroupRepo) group_repo: PostGroupRepo,
		@InjectRepository(UserRepo) user_repo: UserRepo,
		@InjectRepository(GroupParticipantRepo) group_participant_repo: GroupParticipantRepo
	) {
		super(group_repo, user_repo, group_participant_repo);
	}

}