import { Module, forwardRef } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { AuthService } from 'src/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from 'src/account/account.entity';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants'

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
        providers: [AuthService, LocalStrategy, JwtStrategy],
        exports: [AuthService, JwtModule],
})

export class AuthModule {}
