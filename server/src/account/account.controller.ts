import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, Session, UnauthorizedException, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';

import { ApiBearerAuth } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

import { UpdateAccountDTO } from './dtos/updateAccount.dto';
import { CreateAccountDTO } from './dtos/createAccount.dto';
import { AccountDTO } from './dtos/account.dto';
import { Account } from './account.entity';
import { AccountService } from './account.service';

import { JwtAuthGuard, LocalAuthGuard } from '@auth/auth.guard';
import { ImageDTO } from '@image/image.dto';
import UploadService from '@image/upload.service';
import { multerOptions } from '@middleware/multerOptions';

// @UseGuards(JwtAuthGuard) 유효한 JWT가 request에 존재하는지 판단 하고 endpoint 보호
// @UseGuards(LocalAuthGuard) -> auth.guard.ts (id, password validate) => account

@Controller('/account')
export class AccountController {

    constructor(
        private account_service: AccountService,
        private uploadService: UploadService
    ) { }

    /**
     * 계정을 생성한다.
     * @param dto 
     * @returns 
     */
    @UseInterceptors(FilesInterceptor('images', 1, multerOptions))
    @Post()
    async singUp(
        @Body() dto: CreateAccountDTO,
        @UploadedFiles() files: File[] | null
    ) {
        let uploadedFiles = null

        if (files) {
            uploadedFiles = this.uploadService.uploadFiles(files);
        }

        const result: Account = await this.account_service.CreateAccount(
            dto,
            uploadedFiles
        );
        return { data: { account_pk: result.pk } };
    }

    /**
     * 계정정보를 수정한다.
     * @param req 
     * @param dto 
     * @returns 
     */
    @ApiBearerAuth('access-token')
    @UseInterceptors(FilesInterceptor('images', 1, multerOptions))
    @UseGuards(JwtAuthGuard)
    @Put()
    async UpdateAccount(
        @Req() req, // req.user = pk, email
        @Body() dto: UpdateAccountDTO,
        @UploadedFiles() files: File[] | null
    ) {
        const uploadedFiles: string[] = this.uploadService.uploadFiles(files);
        const result: Account = await this.account_service.UpdateAccount(
            req.user.pk,
            dto,
            uploadedFiles
        );
        return { data: result }
    }

    /**
     * 회원탈퇴 한다.
     * @param req 
     * @returns 
     */
    @ApiBearerAuth('access-token')
    @UseGuards(JwtAuthGuard)
    @Delete()
    async delete(
        @Req() req, // req.user = pk, email
    ) {
        const result = await this.account_service.DeleteAccount(req.user);
        return { data: result }
    }

    /**
     * PK로 계정을 조회한다.
     * @param pk 
     * @returns 
     */
    @Get('/:pk')
    async GetAccountByPK(
        @Param('pk') pk: string
    ) {
        const result = await this.account_service.GetAccountByPK(pk);
        return { data: result }
    }

    /**
     * Name으로 계정을 조회한다.
     * @param name 
     * @returns 
     */
    @Get('/:name')
    async GetAccountByName(
        @Param('name') name: string
    ) {
        const result = await this.account_service.findOne(name);
        return { data: result }
    }
}