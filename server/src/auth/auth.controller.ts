import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
// import { ImageDTO } from '../image/image.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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