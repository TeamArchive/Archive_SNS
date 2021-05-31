import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UnauthorizedException
} from '@nestjs/common';

import { VerifyAccessToken } from "src/middleware/jwt.auth";
import { CommentLikeService } from './like.service';

@Controller()
export class CommentLikeControl {

    constructor(private comment_like_service: CommentLikeService) {}

    @Get("/:comment_pk")
    async CountLike(
        @Param("comment_pk") comment_pk: string, 
        @Res() res: Response
    ) {
        const CountLike_Result = 
            await this.comment_like_service.CountLike(comment_pk);

        if(!CountLike_Result){ throw new UnauthorizedException() }

        return { data : CountLike_Result };
    }

    @Get()
    // @UseBefore(VerifyAccessToken)
    public async WhoLike(
        @Body() body,
        @Res() res: Response
    ) {
        const Who_Like = await this.comment_like_service.WhoLike(
            body.comment_pk,
            body.limit
        );

        if(!Who_Like){ throw new UnauthorizedException() }

        return { data : Who_Like };
    }

    @Get()
    // @UseBefore(VerifyAccessToken)
    public async ToggleLike(
        @Body() body,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const Who_Like = await this.comment_like_service.WhoLike(
            user_pk,
            body.comment_pk
        );

        if(!Who_Like){ throw new UnauthorizedException() }

        return { data : Who_Like };
    }
}
