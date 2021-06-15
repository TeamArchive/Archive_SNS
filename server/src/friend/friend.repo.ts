import { EntityRepository, Repository } from "typeorm";

import { Friend } from '@friend/friend.entity';

@EntityRepository(Friend)
export class FriendRepo extends Repository<Friend> {
	
	public async getFriendList( account_pk: string ): Promise<Friend[]> {
		
		return this.createQueryBuilder("friend")
			.leftJoinAndSelect("friend.friend", "account")
			.where("friend.account_pk =: account_pk", {account_pk})
			.andWhere("friend.accept =: value", { value: true })
			.getMany();

	}

	public async getList( account_pk: string ): Promise<Friend[]> {

		return this.createQueryBuilder("friend")
			.leftJoinAndSelect("friend.friend", "account")
			.where("friend.account_pk = :pk", { pk: account_pk })
			.getMany();

	}

	public async getBidirectly(
		account_pk: string,
		is_accepted: boolean = true
	): Promise<Friend[]> {

		return this.createQueryBuilder("friend")
			.leftJoinAndSelect("friend.friend", "account")
			.where("friend.account_pk = :pk", 			{ pk: account_pk })
			.andWhere("friend.account_pk = :accept", 	{ accept: is_accepted })
			.getMany();

	}

}