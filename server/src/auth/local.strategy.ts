import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountDTO } from 'src/account/account.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor( private authService: AuthService ) {
		super();
	}

	async validate( account_dto: AccountDTO ): Promise<any> {
		const account = await this.authService.ValidateAccount( account_dto );
		if (!account) {
			throw new UnauthorizedException();
		}
		return account;
	}
}