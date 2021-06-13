import { EntityRepository, Repository } from "typeorm";
import { Group, ChatGroup, PostGroup, GroupParticipant } from './group.entity';

type ET = (ChatGroup | PostGroup)
export class GroupRepo<T extends ET> extends Repository<T> { 
	
	/**
	 * Group Search
	 * 그룹 검색
	 * 
	 * @param query : Query for search
	 * @returns Result group list
	 */
	public async search( query: string ) : Promise<T[]> {
		return this.createQueryBuilder("group")
			.where("group.title like :query", { query:`%${query}%` })
			.getMany();
	}

}

@EntityRepository(ChatGroup)
export class ChatGroupRepo extends GroupRepo<ChatGroup> { }

@EntityRepository(PostGroup)
export class PostGroupRepo extends GroupRepo<PostGroup> { }

@EntityRepository(GroupParticipant)
export class GroupParticipantRepo extends Repository<GroupParticipant> {

	/**
	 * New Participant; Put members in the group
	 * 그룹에 맴버 추가
	 * 
	 * @param group_pk : Target group's pk
	 * @param account_pk : Account PK which of members to be added to the group
	 * @param default_rank : default rank number
	 * @returns Traget group entity
	 */
	public async newParticipant( group_pk: string, account_pk: string[], default_rank = 0 ) {
		const result = [];
		
		account_pk.map( pk => {
			const new_ent = new GroupParticipant;
			new_ent.participant_pk 	= pk;
			new_ent.group_pk 		= group_pk;
			new_ent.rank			= default_rank;

			result.push( this.save(new_ent) );
		});

		return result;
	}

}