import { UseGuards } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { ChatService } from "@chat/chat.service";
import { ChatDTO } from "@chat/chat.dto";
import { WsJwtGuard } from '@auth/auth.guard';
import { ChatGroupService } from '@group/group.service';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {

	constructor(
		private chat_service: ChatService,
		private chat_group_service: ChatGroupService
	) { }

	@WebSocketServer()
	wsServer: Server;

	@SubscribeMessage('init')
	@UseGuards(WsJwtGuard)
	handleMessage(client: Socket, client_pk: string) {
		client.join(client_pk);
	}

	@SubscribeMessage('sendChat')
	@UseGuards(WsJwtGuard)
	async sendChatMessage(client: Socket, payload: ChatDTO) {

		const result = await this.chat_service.send(payload.writer_pk, payload)

		const paticipant = await this.chat_group_service.getParticipant(payload.group_pk);
		if (result && paticipant) {
			for (const it of paticipant) {

				this.wsServer.to(it.participant_pk).emit(
					'receiveSendChat',
					{
						data: {
							status: 'OK',
							payload
						}
					}
				);

			}
		}

	}

	@SubscribeMessage('deleteChat')
	@UseGuards(WsJwtGuard)
	async deleteChatMessage(client: Socket, payload: ChatDTO) {

		const result = await this.chat_service.delete(payload.writer_pk, payload.group_pk);

		const paticipant = await this.chat_group_service.getParticipant(payload.group_pk);
		if (result && paticipant) {
			for (const it of paticipant) {

				this.wsServer.to(it.participant_pk).emit(
					'receiveSendChat',
					{
						data: {
							status: 'OK',
							payload
						}
					}
				);

			}
		}

	}

}