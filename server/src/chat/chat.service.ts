import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getConnection } from 'typeorm'

import { Chat } from '@chat/chat.entity';
import { ChatRepo } from './chat.repo';
import { ChatDTO } from '@chat/chat.dto';

import { ChatGroupService } from '@group/group.service';
import { GroupParticipantDTO } from '@group/group.dto';

export class ChatService {

	constructor(
		@InjectRepository(Chat) private chat_repo: ChatRepo,
		private group_service: ChatGroupService
	) { }

	/**
	 * Send message on chat group
	 * 채팅 그룹에 메시지 보내기
	 * 
	 * @param writer_pk : Message writer's account PK
	 * @param dto : Chat DTO
	 * @returns if send the message successfully return the chat entity, if not return undefind
	 */
	public async send(
		writer_pk: string,
		dto: ChatDTO
	): Promise <Chat | undefined> {
		const ent = await dto.toEntity();
		
		/**
		 * < Check is it exist >
		 */
		const particiapnt = await this.group_service.isParticipant({
			participant_pk: writer_pk,
			group_pk: ent.group_pk
		} as GroupParticipantDTO)

		if(!particiapnt)
			return undefined;

		/**
		 * < Send Message >
		 */
		return await this.chat_repo.save(ent);
	}

	/**
	 * Delete message on chat group
	 * 채팅 그룹에서 메시지 삭제하기
	 * 
	 * @param writer_pk : Message writer's account PK
	 * @param chat_pk : Chat Message's PK
	 * @returns 
	 */
	public async delete (
		writer_pk: string,
		chat_pk: string
	) {
		/**
		 * < Check is it exist && is real this chat writer >
		 */
		const chat = await this.chat_repo.findOne(chat_pk);
		if(!chat || chat.writer_pk != writer_pk)
			return undefined

		/**
		 * < Change chat's state to 'Deleted' >
		 */
		chat.is_deleted = true;

		return await this.chat_repo.remove(chat);
	}

}

