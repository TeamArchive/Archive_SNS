import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostImage, ProfileImage } from '@image/image.entity';
import { PostImageRepo, ProfileImageRepo } from '@image/image.repo';

@Module({
    imports: [TypeOrmModule.forFeature([PostImage, ProfileImage])],
    providers: [PostImageRepo, ProfileImageRepo],
    exports: [PostImageRepo, ProfileImageRepo]
})
export class ImageModule  {}
