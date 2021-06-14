import { Length, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import sanitizeHtml from 'sanitize-html';

import { Chat } from "@chat/chat.entity";
import { writer } from 'repl';

export class ChatDTO {

	@ApiProperty()
	@IsNotEmpty()
	@Length(36)
	@IsString()
	writer_pk: string;

	@ApiProperty()
	@IsNotEmpty()
	@Length(36)
	@IsString()
	group_pk: string;
	
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content: string;

	public static async toEntity ( dto: ChatDTO ) {
		const { content, writer_pk, group_pk } = dto;

		const chat_ent 		= new Chat;
		
		chat_ent.content 	= sanitizeHtml(content);
		chat_ent.writer_pk 	= sanitizeHtml(writer_pk);
		chat_ent.group_pk 	= sanitizeHtml(group_pk);

		return chat_ent;
	}

}
