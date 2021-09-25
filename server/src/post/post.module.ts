import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostRepo } from './post.repo';

import { Image } from '@image/image.entity';
import { ImageModule } from '@image/image.module';
import UploadService from '@image/upload.service';
import { PostImageRepo } from '@image/image.repo';
import { GroupModule } from '@group/group.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Post,
            Image,
            PostRepo,
            PostImageRepo
        ]),
        ImageModule,
        GroupModule
    ],
    controllers: [PostController],
    providers: [PostService, UploadService],
    exports: [PostService],
})
export class PostModule { }
