import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { AuthService } from 'src/auth/auth.service';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';

@Controller()
export class AccountController {
    constructor(
        private AuthService : AuthService,
        private AccountService : AccountService
    ) {}

    @UseGuards(JwtAuthGuard)    // 유효한 JWT가 request에 존재하는지 판단 하고 endpoint 보호
    @Get('/profile')
    getProfile(
        @Req() req
    ){
        return req.user;
    }
    
    @UseGuards(LocalAuthGuard)  // -> auth.guard.ts (id, password validate)
    @Post('/login')
    async login(
        @Req() req  // req.user = account
    ){
        // token 생성
        const access_token = this.AuthService.login(req.user);    
        if(!access_token) {
            throw new UnauthorizedException();
        }

        return {
            data: {
                access_token: access_token,
                account_pk: req.user.pk
            }
        }
    }

    @Post('/register')
    // @UseBefore(ProfileImageMulter.single('image'))
    async register(
        // 테스트 해봐야 함 (body 두개 붙나 안붙나)
        @Body() AccountDTO: AccountDTO,
        @Body() body
    ){
        let profile_img = null;

        if( body.file.prfoile_img_url ) {
            profile_img = new ImageDTO();
            profile_img.url = body.profile_img_url;
        }

        const CreateAccount_Result = 
            await this.AccountService.CreateAccount(AccountDTO, profile_img);
        
        //_access_token, _refresh_token 왜 생성함?

        return {
            data: {
                account_pk: CreateAccount_Result.pk
            }
        }
    }

    @Post('/account')
    async account(
        
    ){


    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteAccount(
        @Req() req,
    ){
        const account = req.user;

        const deleteAccount_result = await this.AccountService.DeleteAccount(
            account
        );

        return {
            data: deleteAccount_result
        }
    }

}