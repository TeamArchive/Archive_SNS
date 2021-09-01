import {
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/auth.guard';
import { CommentLikeService, PostLikeService } from './like.service';

@Controller('/postlike')
export class PostLikeControl {

    constructor(private post_like_service: PostLikeService) { }

    @Get('/count/:post_pk')
    public async CountLike(
        @Param('post_pk') post_pk: string,
    ) {
        const CountLike_Result =
            await this.post_like_service.CountLike(post_pk);
        return { data: CountLike_Result };
    }

    @Get('/who/:post_pk')
    public async WhoLike(
        @Param('post_pk') post_pk: string,
        @Body() body,
    ) {
        const WhoLike_Result = await this.post_like_service.WhoLike(
            post_pk,
            body.limit
        );
        return { data: WhoLike_Result };
    }

    @Get('/islike/:post_pk')
    @UseGuards(JwtAuthGuard)
    public async IsLike(
        @Param('post_pk') post_pk: string,
        @Req() req
    ) {
        const IsLike_Result = await this.post_like_service.IsLike(
            req.user.pk,
            post_pk
        );
        return { data: IsLike_Result };
    }

    @Post('/toggle/:feed_pk')
    @UseGuards(JwtAuthGuard)
    public async ToggleLike(
        @Param('feed_pk') feed_pk,
        @Req() req
    ) {
        const ToggleLike_Result = await this.post_like_service.ToggleLike(
            req.user.pk,
            feed_pk
        );
        return { data: ToggleLike_Result };
    }
}

@Controller('/commentlike')
export class CommentLikeControl {

    constructor(private comment_like_service: CommentLikeService) { }

    @Get("/count/:comment_pk")
    async CountLike(
        @Param("comment_pk") comment_pk: string,
    ) {
        const CountLike_Result =
            await this.comment_like_service.CountLike(comment_pk);
        return { data: CountLike_Result };
    }

    @Get('/who/:comment_pk')
    public async WhoLike(
        @Param("comment_pk") comment_pk: string,
        @Body() body
    ) {
        const Who_Like = await this.comment_like_service.WhoLike(
            comment_pk,
            body.limit
        );
        return { data: Who_Like };
    }

    @Get('/toggle/:comment_pk')
    @UseGuards(JwtAuthGuard)
    public async ToggleLike(
        @Param("comment_pk") comment_pk: number,
        @Req() req
    ) {
        const Who_Like = await this.comment_like_service.WhoLike(
            req.user.pk,
            comment_pk
        );
        return { data: Who_Like };
    }
}