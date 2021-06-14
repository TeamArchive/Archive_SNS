import { Body, Controller, Get, Post, Delete, Put, Req, Param, UseGuards, Query, Res } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ChatService } from '@chat/chat.service';
import { ChatDTO } from '@chat/chat.dto';

import { JwtAuthGuard, LocalAuthGuard } from '@auth/auth.guard';

@Controller('chat')
@ApiBearerAuth('access-token')
export class ChatController {
	
	constructor (private chat_service: ChatService) { }

	@Post()
	@UseGuards(JwtAuthGuard)
	public async send( 
		@Body() dto: ChatDTO,
		@Req() req, 
	) {
		const account 	= req.user;
		const result	= await this.chat_service.send(account.pk, dto);

		return { data: result };
	}

	@Delete(":chat_pk")
	@UseGuards(JwtAuthGuard)
	public async delete( 
		@Param("chat_pk") chat_pk: string,
		@Req() req, 
	) {
		const account 	= req.user;
		const result	= await this.chat_service.delete(account.pk, chat_pk);

		return { data: result };
	}

}