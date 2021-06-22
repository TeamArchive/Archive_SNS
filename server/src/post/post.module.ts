import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Image } from '../image/image.entity';
import { PostRepo } from './post.repo';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, Image]),
    ],
    controllers: [PostController],
    providers: [PostService, PostRepo],
    exports: [PostService, PostRepo],
})
export class PostModule {}
