import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@root/post/post.entity';
import { PostModule } from '@root/post/post.module';
import { PostRepo } from '@root/post/post.repo';
import { CommentLikeControl, PostLikeControl } from './like.controller';
import { PostLike, CommentLike } from './like.entity'
import { CommentLikeRepo, PostLikeRepo } from './like.repo';
import { CommentLikeService, PostLikeService } from './like.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PostLike, CommentLike]),
        PostModule
    ],
    controllers: [PostLikeControl, CommentLikeControl],
    providers: [PostLikeService, CommentLikeService, PostRepo]
})

export class LikeModule {}
