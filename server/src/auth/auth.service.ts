import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Injectable } from "@nestjs/common";

import { AccountRepo } from "src/account/account.repo";
import { AccountDTO } from "src/account/account.dto";
import { Account } from "src/account/account.entity";


@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(Account) private AccountRepo: AccountRepo
	) { }

	//Validate: 확인
	public async ValidateAccount(
		email: string,
		password: string
	): Promise<Account> 
	{
		const account = await this.AccountRepo.findOne({
			where: { email }
		});

		if ( account ) {
			const is_pw_match = 
				await account.check_password(password);

			if (is_pw_match) 
				return account;
		}
		return null;
	}

	public async ValidateRefreshToken (
		account_pk : string,
		refresh_token : string
	) {
		const result = await this.AccountRepo.findOne({
			select: ["pk", "email", "name"],
			where: {
				pk: account_pk,
				refresh_toke: refresh_token,
			}
		});
		
		return result ? result : undefined;
	}

	public async SaveRefreshTokenDirectly(
		account : Account,
		refresh_token : string
	) {
		account.refresh_token = refresh_token;
		return await this.AccountRepo.save(account);
	}

	public async SaveRefreshToken(
		account_pk : string,
		refresh_token : string,
	) : Promise<Account> {
		const account = await this.AccountRepo.findOne({where: {pk: account_pk}});

		if(account) {
			account.refresh_token = refresh_token;
			return await this.AccountRepo.save(account);
		}
		
		return undefined;
	}

}