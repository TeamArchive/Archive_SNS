import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatGroup, PostGroup, GroupParticipant } from '@group/group.entity';
import { ChatGroupService, PostGroupService } from '@group/group.service';
import { PostGroupControlller, ChatGroupControlller } from '@group/group.controller';
import { ChatGroupRepo, PostGroupRepo, GroupParticipantRepo } from '@group/group.repo';

import { AccountModule } from '@account/account.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ChatGroup, PostGroup, GroupParticipant]),
		TypeOrmModule.forFeature([
			ChatGroupRepo,
			PostGroupRepo,
			GroupParticipantRepo
		]),
		AccountModule
	],
	controllers: [PostGroupControlller, ChatGroupControlller],
	providers: [
		// Services
		ChatGroupService,
		PostGroupService,
	],
	exports: [ChatGroupService, PostGroupService],
})
export class GroupModule { }