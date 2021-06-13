import { Module, Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Chat } from '@chat/chat.entity';
import { ChatService } from '@chat/chat.service';
import { ChatController } from '@chat/chat.controller';

import { AuthModule } from '@root/auth/auth.module';
import { ImageModule } from '@root/image/image.module';
import { GroupModule } from '@group/group.module';

@Module({
	imports:[
		TypeOrmModule.forFeature([Chat]),
        AuthModule,
        ImageModule,
		GroupModule
	], 
	controllers:[ChatController],
	providers:[ChatService],
	exports:[ChatService]
})
export class ChatModule {}
