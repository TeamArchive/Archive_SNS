import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UnauthorizedException
} from '@nestjs/common';
import { CommentLikeService, PostLikeService } from './like.service';

@Controller()
export class FeedLikeControl {

    constructor(private post_like_service: PostLikeService) {}

    @Get()
    public async CountLike(
        @Body() body,
    ) {
        const CountLike_Result = 
            await this.post_like_service.CountLike( body.post_pk );
        if(!CountLike_Result) throw new UnauthorizedException()

        return { data : CountLike_Result };
    }

    @Get('/:post_pk')
    public async WhoLike(
        @Param('post_pk') post_pk: string,
        @Body() body,
    ) {
        const WhoLike_Result = await this.post_like_service.WhoLike(
            post_pk,
            body.limit
        );
        if(!WhoLike_Result) throw new UnauthorizedException()

        return { data : WhoLike_Result };
    }

    @Get('/islike/:post_pk')
    // @UseBefore(VerifyAccessToken)
    public async IsLike(
        @Param('post_pk') post_pk: string,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const IsLike_Result = await this.post_like_service.IsLike(
            user_pk,
            post_pk
        );
        if(!IsLike_Result) throw new UnauthorizedException() 

        return { data : IsLike_Result };
    }

    @Post('/togglelike/:feed_pk')
    // @UseBefore(VerifyAccessToken)
    public async ToggleLike(
        @Param('feed_pk') feed_pk,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.user_pk;

        const ToggleLike_Result = await this.post_like_service.ToggleLike(
            user_pk,
            feed_pk
        );
        if(!ToggleLike_Result) throw new UnauthorizedException() 

        return { data : ToggleLike_Result };
    }
}
