import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccountRepo } from 'src/account/account.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants'

@Module({
        imports: [
                TypeOrmModule.forFeature([Account]),
                AccountModule, 
                PassportModule,
                JwtModule.register({
                        secret: jwtConstants.secret,
                        signOptions: {
                                expiresIn: 3600
                        }
                })
        ],
        providers: [AuthService, LocalStrategy, JwtStrategy],
        exports: [AuthService, JwtModule],
})

export class AuthModule {}
