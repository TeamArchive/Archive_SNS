import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountDTO } from 'src/account/account.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor( private authService: AuthService ) {
		super({ usernameField: 'email' });
	}

	async validate( email: string, password: string ): Promise<any> {
		const account = await this.authService.ValidateAccount( email, password );

		if (!account) {
			throw new UnauthorizedException();
		}

		return account;	//req.user 할당
	}
}