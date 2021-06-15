import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Friend } from '@friend/friend.entity';
import { FriendRepo } from '@friend/friend.repo';
import { FriendService } from '@friend/friend.service';
import { FriendController } from '@friend/friend.controller';

import { AccountModule } from '@account/account.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Friend]),
		TypeOrmModule.forFeature([FriendRepo]),
		AccountModule
    ],
	controllers: [FriendController],
    providers: [FriendService],
	exports: [FriendService],
})
export class FriendModule {}