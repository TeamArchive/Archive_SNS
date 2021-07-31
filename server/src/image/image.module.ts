import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostImage, ProfileImage } from '@image/image.entity';
import { PostImageRepo, ProfileImageRepo } from '@image/image.repo';
import UploadService from './upload.service';

@Module({
    imports: [TypeOrmModule.forFeature([PostImage, ProfileImage])],
    providers: [PostImageRepo, ProfileImageRepo, UploadService],
    exports: [PostImageRepo, ProfileImageRepo, UploadService]
})
export class ImageModule  {}
