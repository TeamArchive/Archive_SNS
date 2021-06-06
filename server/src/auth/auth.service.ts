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

	async login(
		account: any
	){
		const payload = {
			name: account.name,
			sub: account.email	// 토큰 제목
		}

		return {
			access_token: this.jwtService.sign(payload)
		};
	}

}