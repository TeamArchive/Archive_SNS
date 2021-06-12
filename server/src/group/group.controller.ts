import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ChatGroupService, PostGroupService } from '@group/group.service';
import { GroupDTO } from '@group/group.dto';

import { JwtAuthGuard, LocalAuthGuard } from '@auth/auth.guard';

@Controller('group')
export class GroupController {

	constructor(
        private chat_group_service : ChatGroupService,
		private post_group_service : PostGroupService,
    ) {}

	@Post('/register')
	@UseGuards(JwtAuthGuard)
	async register( @Req() req, @Body() group_dto: GroupDTO) {
		
	}
}