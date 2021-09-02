import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from '@chat/chat.entity';
import { ChatRepo } from '@chat/chat.repo';
import { ChatService } from '@chat/chat.service';
import { ChatController } from '@chat/chat.controller';
import { ChatGateway } from '@chat/chat.gateway';

import { AuthModule } from '@auth/auth.module';
import { ImageModule } from '@image/image.module';
import { GroupModule } from '@group/group.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Chat]),
		TypeOrmModule.forFeature([ChatRepo]),
		AuthModule,
		ImageModule,
		GroupModule
	],
	controllers: [ChatController],
	providers: [ChatService, ChatGateway],
	exports: [ChatService]
})
export class ChatModule { }
