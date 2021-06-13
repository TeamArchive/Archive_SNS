import { Module, forwardRef, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from 'src/auth/auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants'

import { Account } from '@account/account.entity';
import { AccountModule } from '@account/account.module';
import { AccountRepo } from '@account/account.repo';

@Module({
	imports: [
		PassportModule,
		forwardRef(() => AccountModule),
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: {
				expiresIn: 3600
			}
		})
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy, AccountRepo],
	exports: [AuthService, JwtModule],
})

export class AuthModule {}
