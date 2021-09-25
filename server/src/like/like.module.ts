import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@post/post.entity';
import { PostModule } from '@post/post.module';
import { PostRepo } from '@post/post.repo';
import { CommentLikeControl, PostLikeControl } from '@like/like.controller';
import { PostLike, CommentLike } from '@like/like.entity'
import { CommentLikeRepo, PostLikeRepo } from '@like/like.repo';
import { CommentLikeService, PostLikeService } from '@like/like.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PostLike, 
            CommentLike, 
            PostLikeRepo, 
            CommentLikeRepo, 
            PostRepo
        ]),
        PostModule
    ],
    controllers: [PostLikeControl, CommentLikeControl],
    providers: [PostLikeService, CommentLikeService]
})

export class LikeModule { }
