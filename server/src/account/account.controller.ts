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

    constructor (private account_service : AccountService) {}
    
    // @UseBefore(ProfileImageMulter.single('image'))
    @Post('/signup')
    async singUp(
        @Body() dto: AccountDTO,
    ) {
        const result = await this.account_service.CreateAccount(dto);
        return { data: { account_pk: result.pk }};
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(
        @Req() req, // req.user = pk, email
    ){
        const result = await this.account_service.DeleteAccount( req.user );
        return { data: result }
    }

    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Put()
    async UpdateAccount(
        @Req() req, // req.user = pk, email
        @Body() dto: UpdateAccountDTO,
    ){
        const result = await this.account_service.UpdateAccount( 
            req.user.pk,
            dto,
        );
        return { data: result }
    }

    @Get('/:pk')
    async GetAccountByPK(
        @Param('pk') pk: string
    ){
        const result = await this.account_service.GetAccountByPK( pk );
        return { data: result }
    }

    @Get('/:name')
    async GetAccountByName(
        @Param('name') name: string
    ){
        const result = await this.account_service.findOne(name);
        return { data: result }
    }
}