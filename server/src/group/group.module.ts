import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatGroup, PostGroup, GroupParticipant } from '@group/group.entity';
import { ChatGroupService, PostGroupService } from '@group/group.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([ChatGroup, PostGroup, GroupParticipant]),
    ],
    providers: [ChatGroupService, PostGroupService],
})
export class GroupModule {}
