import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { FriendModule } from './friend/friend.module';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { GroupModule } from './group/group.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AccountModule,
    ChatModule,
    CommentModule,
    FriendModule,
    PostModule,
    ImageModule,
    GroupModule,
    LikeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
