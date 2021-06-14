import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UseGuards} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { JwtAuthGuard, LocalAuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateAccountDTO } from './updateAccount.dto';

// @UseGuards(JwtAuthGuard) 유효한 JWT가 request에 존재하는지 판단 하고 endpoint 보호
// @UseGuards(LocalAuthGuard) -> auth.guard.ts (id, password validate) => account

@Controller('/account')
export class AccountController {

    constructor(
        private AccountService : AccountService
    ) {}
    
    // @UseBefore(ProfileImageMulter.single('image'))
    @Post('/signup')
    async SignUp(
        @Body() accountDTO: AccountDTO,
    ){
        const createAccount_result = await this.AccountService.CreateAccount(accountDTO);
        return { data: { account_pk: createAccount_result.pk }};
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Delete()
    async DeleteAccount(
        @Req() req, // req.user = pk, email
    ){
        const deleteAccount_result = await this.AccountService.DeleteAccount( req.user );
        return { data: deleteAccount_result }
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Put()
    async UpdateAccount(
        @Req() req, // req.user = pk, email
        @Body() accountDTO: UpdateAccountDTO,
    ){
        const updateAccount_result = await this.AccountService.UpdateAccount( 
            req.user.pk,
            accountDTO,
        );
        return { data: updateAccount_result }
    }

    @Get('/getaccount_bypk/:account_pk')
    async GetAccountByPK(
        @Param('account_pk') account_pk: string
    ){
        const getAccountByPK_result = await this.AccountService.GetAccountByPK( account_pk );
        return { data: getAccountByPK_result }
    }

    @Get('/getaccount_byname/:name')
    async GetAccountByName(
        @Param('name') name: string
    ){
        const GetAccountByEmail_result = await this.AccountService.GetAccountByName( name );
        return { data: GetAccountByEmail_result }
    }
}