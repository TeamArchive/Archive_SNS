import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity'
import { AccountController } from './account.controller'
import { AccountService } from './account.service'


@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    exports: [AccountService],
    controllers: [AccountController],
    providers: [AccountService]
})

export class AccountModule {}