import { Module, forwardRef, Controller } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import secretKey from '@root/secret-key.json';

import { AccountModule } from '@account/account.module';
import { AccountRepo } from '@account/account.repo';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
	imports: [
		PassportModule,
		forwardRef(() => AccountModule),
		JwtModule.register({
			secret: secretKey.jwt.secretKey,
			signOptions: {
				expiresIn: 3600
			}
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService, 
		LocalStrategy, 
		JwtStrategy, 
		GoogleStrategy, 
		AccountRepo
	],
	exports: [AuthService, JwtModule],
})

export class AuthModule { }
