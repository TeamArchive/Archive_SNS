import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
        imports: [
                AccountModule, 
                PassportModule,
                JwtModule.register({
                        secret: 'jwt secret key',
                        signOptions: {
                                expiresIn: 3600
                        }
                })
        ],
        providers: [AuthService, LocalStrategy, JwtStrategy],
        exports: [AuthService, JwtModule]
})

export class AuthModule {}
