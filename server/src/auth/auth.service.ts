import { InjectRepository } from "@nestjs/typeorm";
import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'

import { Account } from "src/account/account.entity";
import { AccountRepo } from "src/account/account.repo";
import { AccountService } from '@account/account.service';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => AccountService))
		private readonly account_repo: AccountService,
		private jwt_service: JwtService
	) {}

	async ValidateAccount(
		email: string, 
		password: string,
	): Promise<Account> 
	{
		const account = await this.account_repo.findOne({
			where: { email: email }
		});

		if ( account ) {
			const is_pw_match = 
				await account.checkPassword(password);

			if (is_pw_match) 
				return account;
		} 

		return null;
	}

	async AccessTokenGenerator( account ){
		const payload = {
			name: account.name,
			sub: account.email	// 토큰 제목
		}

		return {
			access_token: this.jwt_service.sign(payload)
		};
	}

	async RefreshTokenGenerator( account ){
		return {
			refresh_token: this.jwt_service.sign(account.pk)
		}
	}

	async SaveRefreshToken(
		account: Account,
		refresh_token
	){
		account.refresh_token = refresh_token;

		return await this.account_repo.save(account);
	}

	public async SaveRefreshToken_pk(
		account_pk : string,
		refresh_token : string,
	) : Promise<Account> {
		const account = await this.account_repo.findOne({where: {pk: account_pk}});

		if(account) {
			account.refresh_token = refresh_token;
			return await this.account_repo.save(account);
		}
		
		return undefined;
	}

	async ValidateRefreshToken (
		account_pk : string,
		refresh_token : string
	) {
		const result = await this.account_repo.findOne({
			select: ["pk", "email", "name"],
			where: {
				pk: account_pk,
				refresh_token: refresh_token,
			}
		});
		
		return result ? result : undefined;
	}
}