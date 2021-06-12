import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt'
import { AccountRepo } from "src/account/account.repo";
import { AccountDTO } from "src/account/account.dto";
import { Account } from "src/account/account.entity";


@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(Account) private AccountRepo: AccountRepo,
		private jwtService: JwtService
	) {}

	async ValidateAccount(
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

		return null;
	}

	async AccessTokenGenerator(
		account
	){
		const payload = {
			name: account.name,
			sub: account.email	// 토큰 제목
		}

		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async RefreshTokenGenerator(
		account
	){
		return {
			refresh_token: this.jwtService.sign(account.pk)
		}
	}

	async SaveRefreshToken(
		account: Account,
		refresh_token
	){
		account.refresh_token = refresh_token;

		return await this.AccountRepo.save(account);
	}

	public async SaveRefreshToken_pk(
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

	async ValidateRefreshToken (
		account_pk : string,
		refresh_token : string
	) {
		const result = await this.AccountRepo.findOne({
			select: ["pk", "email", "name"],
			where: {
				pk: account_pk,
				refresh_token: refresh_token,
			}
		});
		
		return result ? result : undefined;
	}
}