import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';

// @UseGuards(JwtAuthGuard) 유효한 JWT가 request에 존재하는지 판단 하고 endpoint 보호
// @UseGuards(LocalAuthGuard) -> auth.guard.ts (id, password validate) => account

@Controller('/account')
export class AccountController {

    constructor(
        private AccountService : AccountService
    ) {}
    
    // @UseBefore(ProfileImageMulter.single('image'))
    @Post('/register')
    async register(
        @Body() accountDTO: AccountDTO,
    ){
        const createAccount_result = await this.AccountService.CreateAccount(accountDTO);
        return { data: {
            account_pk: createAccount_result.pk
        }};
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteAccount(
        @Req() req, // req.user = account
    ){
        const deleteAccount_result = await this.AccountService.DeleteAccount( req.user );
        return {
            data: deleteAccount_result
        }
    }

}