import { CanActivate, Logger } from '@nestjs/common';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from './auth.service';

// -> local.strategy.ts
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') { }

// -> jwt.strategy.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

// -> google.strategy.ts
@Injectable()
export class GoogleStrategy extends AuthGuard('google') { }

// For Web Sockert IO
@Injectable()
export class WsJwtGuard implements CanActivate {
	private logger: Logger = new Logger(WsJwtGuard.name);

	constructor(private authService: AuthService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {

		try {
			const switched = context.switchToWs();
			const client: Socket = switched.getClient<Socket>();

			let token = client.handshake.auth.token;
			token = token.replace(/jwt /g, '');

			const account = await this.authService.ValidateAccessToken(token)
			if (!account)
				return false;

			switched.getData()['writer_id'] = account.sub;

			return true;

		} catch (err) {
			throw new WsException(err.message);
		}
	}
}