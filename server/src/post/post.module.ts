import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { Image } from '../image/image.entity';
import { PostRepo } from './post.repo';
import { ImageModule } from '@root/image/image.module';
import UploadService from '@root/image/upload.service';
import { PostImageRepo } from '@root/image/image.repo';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post, Image, PostRepo, PostImageRepo]),
        ImageModule
    ],
    controllers: [PostController],
    providers: [PostService, UploadService],
    exports: [PostService],
})
export class PostModule {}
