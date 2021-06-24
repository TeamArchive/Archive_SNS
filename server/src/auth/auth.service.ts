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
		console.log('validateAccount - account : ', account);

		if ( account ) {
			const is_pw_match = await account.checkPassword(password);
			if (is_pw_match) return account;
		} 

		return null;
	}

	async AccessTokenGenerator( account ){
		const payload = {
			name: account.name,
			sub: account.pk	// 토큰 제목
		}
		return { access_token: this.jwt_service.sign(payload) };
	}

	async RefreshTokenGenerator( account ){
		const payload = {
			name: account.name,
			sub: account.pk	// 토큰 제목
		}
		return this.jwt_service.sign(payload)
	}

	public async SaveRefreshTokenDirectly(
		account : Account,
		refresh_token : any
	) {
		const refresh_account = new Account;
		refresh_account.pk = account.pk;
		refresh_account.refresh_token = refresh_token;
		const repo_result = await this.account_repo.save( refresh_account );

		return repo_result;
	}

	async removeRefreshToken(
		account_pk : string,
	) {
		const account = await this.account_repo.findOne({where: {pk: account_pk}});

		if(account) {
			account.refresh_token = null;
		}

		return this.account_repo.save( account );
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

	googleLogin(req) {
		if (!req.user) return 'No user from google';

		return {
			message: 'User information from google',
			user: req.user,
		};
	}
	
	// async SaveRefreshToken(
	// 	account: Account,
	// 	refresh_token
	// ){
	// 	account.refresh_token = refresh_token;

	// 	return await this.account_repo.save(account);
	// }

	// public async SaveRefreshToken_pk(
	// 	account_pk : string,
	// 	refresh_token : string,
	// ) : Promise<Account> {
	// 	const account = await this.account_repo.findOne({where: {pk: account_pk}});

	// 	if(account) {
	// 		account.refresh_token = refresh_token;
	// 		return await this.account_repo.save(account);
	// 	}
		
	// 	return undefined;
	// }
}