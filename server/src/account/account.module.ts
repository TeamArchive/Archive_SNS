import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        AuthModule
    ],
    controllers: [AccountController],
    providers: [AccountService, AuthService],
    exports: [AccountService],
})

export class AccountModule {}