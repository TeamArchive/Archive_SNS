import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
// import { ImageDTO } from '../image/image.dto';
import { AuthService } from 'src/auth/auth.service';
import { GoogleStrategy, JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
    constructor(
        private authService : AuthService,
    ) {}
    
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async Login(
        @Req() req  // req.user = account
    ){
        const access_token = await this.authService.AccessTokenGenerator(req.user);    
        const refresh_token = await this.authService.RefreshTokenGenerator(req.user);
        if(!access_token || !refresh_token) throw new UnauthorizedException();

        await this.authService.SaveRefreshTokenDirectly(req.user, refresh_token)

        return {
            data: {
                access_token: access_token,
                refresh_token: refresh_token,
                account_pk: req.user.pk
            }
        }
    }

    @ApiBearerAuth('access-token')
    @Post('/logout')
    @UseGuards(JwtAuthGuard)
    async Logout(
        @Req() req // req.user = account
    ){
        return await this.authService.removeRefreshToken(req.user.pk);
    }

    @Get('google')  // 1
    @UseGuards(GoogleStrategy)
    async googleAuth(@Req() req) {}

    @Get('google/callback') // 2
    @UseGuards(GoogleStrategy)
    async googleAuthRedirect(
        @Req() req
    ) {
        console.log("req.user:", req.user);
        const google_name = req.user.lastName + req.user.firstName
        const refresh_token = await this.authService.RefreshTokenGenerator(google_name);
        if(!refresh_token) throw new UnauthorizedException();

        return {
            data: {
                access_token: req.user.accessToken,
                refresh_token: refresh_token,
                account_pk: req.user.pk
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('/validate_refresh_token')
    async ValidateRefreshToken(
        @Req() req  // req.user = account
    ){
        const validateRefreshToken_result = await this.authService.ValidateRefreshToken(
            req.user.pk, 
            req.user.refresh_token
        );
        return { data: validateRefreshToken_result };
    }

}