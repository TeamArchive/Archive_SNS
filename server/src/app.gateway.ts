import { Logger, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  wsSever: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log(`Initialized AppGateway`);
  }

  @SubscribeMessage('connection')
  handleMessage(client: Socket, payload: String): WsResponse<String> {
    // this.wsSever.emit('msgToClient', payload);
    console.log(payload);

    return {
      event: 'msgToClient',
      data: 'Hello Web Socket IO : ' + payload
    };
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(` Client [${client.id}] connected at server`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(` Client [${client.id}] disconnected at server`);
  }

}
