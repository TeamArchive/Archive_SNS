import { Length, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import sanitizeHtml from 'sanitize-html';

import { Chat } from "@chat/chat.entity";

export class ChatDTO {

	@ApiProperty()
	@IsNotEmpty()
	@Length(36)
	@IsString()
	group_pk: string;
	
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	content: string;

	public async toEntity() {
		const { content, group_pk } = this;

		const chat_ent 		= new Chat;
		
		chat_ent.content 	= sanitizeHtml(content);
		chat_ent.group_pk 	= sanitizeHtml(group_pk);

		return chat_ent;
	}

}
