import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostLike, CommentLike } from './like.entity'

@Module({
    imports: [TypeOrmModule.forFeature([PostLike, CommentLike])],
    controllers: [],
    providers: []
})

export class LikeModule {}
