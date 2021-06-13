import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';

// @UseGuards(JwtAuthGuard) 유효한 JWT가 request에 존재하는지 판단 하고 endpoint 보호

@Controller('/account')
export class AccountController {
    constructor(
        private AccountService : AccountService
    ) {}
    
    // @UseBefore(ProfileImageMulter.single('image'))
    @Post('/register')
    async register(
        @Body() AccountDTO: AccountDTO,
    ){
        const createAccount_result = await this.AccountService.CreateAccount(AccountDTO);
        return {
            data: {
                account_pk: createAccount_result.pk
            }
        }
    }

    @UseGuards(LocalAuthGuard)
    @Delete()
    async deleteAccount(
        @Req() req,
    ){
        const deleteAccount_result = await this.AccountService.DeleteAccount(
            req.user    // account
        );
        return {
            data: deleteAccount_result
        }
    }

}