import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Account } from '@account/account.entity';
import { AccountController } from '@account/account.controller';
import { AccountService } from '@account/account.service';
import { AccountRepo } from '@account/account.repo';

import { AuthService } from '@auth/auth.service';
import { AuthModule } from '@auth/auth.module';
import UploadService from '@image/upload.service';

import { Image } from '@image/image.entity';
import { ImageModule } from '@image/image.module';
import { ProfileImageRepo } from '@image/image.repo';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Account,
            AccountRepo,
            Image,
            ProfileImageRepo
        ]),
        forwardRef(() => AuthModule),
        ImageModule
    ],
    controllers: [AccountController],
    providers: [AccountService, UploadService],
    exports: [AccountService],
})

export class AccountModule { }