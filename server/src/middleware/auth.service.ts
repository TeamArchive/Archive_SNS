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

	/**
	 * Verify that the data passed to DTO and the data which exist in 
	 * the Database are correct
	 * 
	 * @param account_dto : Login Account DTO
	 * 
	 * @returns Account Data ( fail : undefined ) 
	 */
	public async ValidateAccount(
		account_dto: AccountDTO 
	): Promise<Account> 
	{
		const account = await this.AccountRepo.findOne({
			where: { email: account_dto.email }
		});

		if ( account ) {
			const is_pw_match = 
				await account.check_password (account_dto.password);

			if (is_pw_match) 
				return account;
		}

		return undefined;
	}

	/**
	 * Check that Refresh Token is Verify Token
	 * 
	 * @param account_pk : Account's PK
	 * @param refresh_token : Account's Refresh Token
	 */
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