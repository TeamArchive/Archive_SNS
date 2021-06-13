import { Body, Controller, Get, Post, Delete, Put, Req, Param, UseGuards, Query, Res } from '@nestjs/common';

import { ChatService } from '@chat/chat.service';
import { ChatDTO } from '@chat/chat.dto';

import { JwtAuthGuard, LocalAuthGuard } from '@auth/auth.guard';

@Controller('chat')
export class ChatController {
	
	constructor (private chat_service: ChatService) { }

	@Post()
	@UseGuards(JwtAuthGuard)
	public async send( 
		@Body() dto: ChatDTO,
		@Req() req, 
	) {
		const account 	= req.user;
		const result	= await this.chat_service.send(account, dto);

		return { data: result };
	}

	@Delete()
	@UseGuards(JwtAuthGuard)
	public async delete( 
		@Param("pk") chat_pk,
		@Req() req, 
	) {
		const account 	= req.user;
		const result	= await this.chat_service.delete(account, chat_pk);

		return { data: result };
	}

}