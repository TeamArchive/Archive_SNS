import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '@root/image/image.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Image } from '../image/image.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, Image]),
    ],
    controllers: [PostController],
    providers: [PostService],
    exports: [],
})
export class PostModule {}
