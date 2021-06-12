import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatGroup, PostGroup, GroupParticipant } from '@group/group.entity';
import { ChatGroupService, PostGroupService } from '@group/group.service';
import { PostGroupControlller, ChatGroupControlller } from '@group/group.controller';
import { AccountModule } from '@account/account.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ChatGroup, PostGroup, GroupParticipant]),
		AccountModule
    ],
	controllers: [PostGroupControlller, ChatGroupControlller],
    providers: [ChatGroupService, PostGroupService],
})
export class GroupModule {}