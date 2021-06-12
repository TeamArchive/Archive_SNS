import {
	EntityRepository, Repository
} from "typeorm";
import { Account } from "./account.entity";

@EntityRepository(Account)
export class AccountRepo extends Repository<Account> {

	public async getDetail( pk: string ): Promise<Account> {
		return this.createQueryBuilder("account")
			.leftJoinAndSelect("account.own_group", "own_group")
			.where("account.pk IN (:pk)", {pk})
			.getOne();
	}

	public async FindByPKs( pk_list: string[] ) : Promise<Account[]> {
		return this.createQueryBuilder("account")
			.where( "account.pk IN (:list)", { list: pk_list } )
			// .orderBy("account.createDate")
			.getMany();
	}

}