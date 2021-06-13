import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
// import { ImageDTO } from '../image/image.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';

@Controller('/auth')
export class AuthController {
    constructor(
        private AuthService : AuthService,
    ) {}
    
    @UseGuards(LocalAuthGuard)  // -> auth.guard.ts (id, password validate)
    @Post('/login')
    async login(
        @Req() req  // req.user = account
    ){

        console.log("get in the function")

        // token 생성
        const access_token = await this.AuthService.AccessTokenGenerator(req.user);    

        // @TODO : Refresh token generator got error

        // const refresh_token = await this.AuthService.RefreshTokenGenerator(req.user);
        // if(!access_token || !refresh_token) 
        if(!access_token) throw new UnauthorizedException();

        // await this.AuthService.SaveRefreshToken(req.user, refresh_token)

        return {
            data: {
                access_token: access_token,
                // refresh_token: refresh_token,
                account_pk: req.user.pk
            }
        }
    }

}