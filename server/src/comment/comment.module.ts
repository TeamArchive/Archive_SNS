import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment, Recomment } from '@comment/comment.entity';
import { CommentRepo, RecommentRepo } from '@comment/comment.repo';
import { CommentService, RecommentService } from '@comment/comment.service';
import { CommentController } from '@comment/comment.controller';

import { PostModule } from '@post/post.module';
import { PostRepo } from '@post/post.repo';

@Module({
	imports: [
		TypeOrmModule.forFeature([Comment, Recomment]),
		TypeOrmModule.forFeature([CommentRepo, RecommentRepo]),
		TypeOrmModule.forFeature([PostRepo]),
		PostModule
    ],
	controllers: [CommentController],
    providers: [CommentService, RecommentService],
	exports: [CommentService, RecommentService],
})
export class CommentModule {}
