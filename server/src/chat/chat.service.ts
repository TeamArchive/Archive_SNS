import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, getConnection } from 'typeorm'

import { Chat } from '@chat/chat.entity';
import { ChatRepo } from './chat.repo';
import { ChatDTO } from '@chat/chat.dto';

import { ChatGroupService } from '@group/group.service';
import { GroupParticipantDTO } from '@group/group.dto';

@Injectable()
export class ChatService {

	constructor(
		// @InjectRepository(Chat) private chat_repo: ChatRepo,
		private chat_repo: ChatRepo,
		private chat_group_service: ChatGroupService
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
	): Promise<Chat | undefined> {

		/**
		 * < Check is it exist >
		 */
		const particiapnt = await this.chat_group_service.isParticipant({
			participant_pk: writer_pk,
			group_pk: dto.group_pk
		} as GroupParticipantDTO);
		if (!particiapnt)
			return undefined;

		const ent = await ChatDTO.toEntity(dto);

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
	public async delete(
		writer_pk: string,
		chat_pk: string
	) {
		/**
		 * < Check is it exist && is real this chat writer >
		 */
		const chat = await this.chat_repo.findOne(chat_pk);
		if (!chat || chat.writer_pk != writer_pk)
			return undefined

		/**
		 * < Change chat's state to 'Deleted' >
		 */
		chat.is_deleted = true;

		return await this.chat_repo.save(chat);
	}

	/**
	 * Get previous chat history
	 * 이전 체팅 내역 가져오기
	 */
	public async getHistory(
		viewer_pk: string,
		group_pk: string,
		offset: number,
		limit: number,
	): Promise<Chat[] | undefined> {

		console.log(this.chat_group_service)

		if (
			await await this.chat_group_service.isParticipant({
				participant_pk: viewer_pk,
				group_pk: group_pk
			} as GroupParticipantDTO)
		) {
			return this.chat_repo.getChat(group_pk, offset, limit);
		}

		return undefined;
	}

}

