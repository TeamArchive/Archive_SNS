import { InjectRepository } from "@nestjs/typeorm";
import { getConnection } from "typeorm";
import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { AccountRepo } from "src/account/account.repo";
import { AccountDTO } from "src/account/account.dto";
import { Account } from "src/account/account.entity";


@Injectable()
export class AuthService {

	constructor(
		@InjectRepository(Account) private AccountRepo: AccountRepo,
		private JwtService: JwtService
	) { }

	async AccessTokenGenerator( Account_DTO: AccountDTO ) {
		const payload = {
			email: Account_DTO.email, 
			name: Account_DTO.name,
		};

		return {
			access_token: this.JwtService.sign(payload)
		};
	}

	public async ValidateAccount(
		AccountDTO: AccountDTO 
	): Promise<Account> 
	{
		const account = await this.AccountRepo.findOne({
			where: { email: AccountDTO.email }
		});

		if ( account ) {
			const is_pw_match = 
				await account.check_password (AccountDTO.password);

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