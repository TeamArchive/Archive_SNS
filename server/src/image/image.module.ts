import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostImage } from './image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [],
    providers: [],
    exports: []
})
export class ImageModule {}
