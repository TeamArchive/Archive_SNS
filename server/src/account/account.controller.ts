import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards
} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { ProfileImageMulter } from "../Middleware/Multer";
import { AuthService } from 'src/auth/auth.service';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
// import { AccessTokenGenerator, RefreshTokenGenerator } from '../auth/jwt.service(폐)';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';

@Controller()
export class AccountController {
    constructor(
        private AuthService : AuthService,
        private AccountService : AccountService
    ) {}

    @UseGuards(LocalAuthGuard)  // -> auth.guard.ts
    @Post('auth/login')
    async login(
        @Req() req
    ){
        return this.AuthService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(
        @Req() req
    ){
        return req.user;
    }
}