import { UseGuards } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from "@nestjs/websockets";
import { Socket, Server } from 'socket.io';
import { ChatService } from "@chat/chat.service";
import { ChatDTO } from "@chat/chat.dto";
import { WsJwtGuard } from '@auth/auth.guard';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {

	constructor(
		private chat_service: ChatService
	) { }

	@WebSocketServer()
	wsServer: Server;

	@SubscribeMessage('sendChat')
	@UseGuards(WsJwtGuard)
	sendChatMessage(client: Socket, payload: ChatDTO) {

		if (this.chat_service.send(payload.writer_pk, payload)) {

			this.wsServer.to(client.id).emit(
				'receiveChat',
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