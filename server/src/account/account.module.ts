import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '@account/account.entity';
import { AccountController } from '@account/account.controller';
import { AccountService } from '@account/account.service';
import { AccountRepo } from '@account/account.repo';

import { AuthService } from '@auth/auth.service';
import { AuthModule } from '@auth/auth.module';

import { ImageModule } from '../image/image.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Account]),
        AuthModule,
        ImageModule
    ],
    controllers: [AccountController],
    providers: [AccountService, AccountRepo],
    exports: [AccountService, AccountRepo],
})

export class AccountModule {}