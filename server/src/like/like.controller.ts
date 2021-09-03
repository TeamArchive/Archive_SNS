import {
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/auth.guard';
import { CommentLikeService, PostLikeService } from './like.service';

@Controller('/postlike')
export class PostLikeControl {

    constructor( private post_like_service: PostLikeService ) { }

    @Get('/count/:post_pk')
    public async CountLike(
        @Param('post_pk') post_pk: string,
    ) {
        console.log("1 : ", post_pk);
        const CountLike_Result =
            await this.post_like_service.CountLike(post_pk);
        return { data: CountLike_Result };
    }

    @Get('/who/:post_pk/:limit')
    public async WhoLike(
        @Param('post_pk') post_pk: string,
        @Param('limit') limit: number
    ) {
        const WhoLike_Result = await this.post_like_service.WhoLike(
            post_pk,
            limit
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

    @Post('/toggle/:post_pk')
    @UseGuards(JwtAuthGuard)
    public async ToggleLike(
        @Param('post_pk') post_pk,
        @Req() req
    ) {
        const ToggleLike_Result = await this.post_like_service.ToggleLike(
            req.user.pk,
            post_pk
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

    @Get('/who/:comment_pk/:limit')
    public async WhoLike(
        @Param("comment_pk") comment_pk: string, 
        @Param("limit") limit: number, 
    ) {
        const Who_Like = await this.comment_like_service.WhoLike(
            comment_pk,
            limit
        );
        return { data: Who_Like };
    }

    @Post('/toggle/:comment_pk')
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