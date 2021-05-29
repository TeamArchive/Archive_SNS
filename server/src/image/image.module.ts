import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from './image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PostImage])],
    controllers: [],
    providers: []
})
export class ImageModule {}
