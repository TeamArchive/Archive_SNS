import { 
    Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UnauthorizedException
} from '@nestjs/common';
import { ImageDTO } from '../image/image.dto';
import { ProfileImageMulter } from "../Middleware/Multer";
import { AuthService } from 'src/middleware/auth.service';
import { AccountService } from './account.service';
import { AccountDTO } from './account.dto';
import { AccessTokenGenerator, RefreshTokenGenerator } from 'src/middleware/jwt.auth';

@Controller()
export class AccountController {
    constructor(
        private AuthService : AuthService,
        private AccountService : AccountService
    ) {}

    @Post('/login')
    async login(
        @Body() Account_DTO: AccountDTO,
    ) {

        const account = await this.AuthService.ValidateAccount(Account_DTO);
        if(!account) { throw new UnauthorizedException() }

        // < Generate Token >
        const _access_token = await AccessTokenGenerator(account);
        const _refresh_token = await RefreshTokenGenerator(account);

        const login = await this.AuthService.SaveRefreshTokenDirectly(
            account, 
            _refresh_token
        );

        if(!login) { throw new UnauthorizedException() }

        return {
            data: {
                access_token: _access_token,
                refresh_token: _refresh_token,
                pk: account.pk
            }
        };
    }

    @Post('/reg')
    // @UseBefore(ProfileImageMulter.single('image'))
    async registration(
        @Body() account_dto: AccountDTO,
        @Req() req,
    ) {
        let profile_img = null;

        if(req.file.prfoile_img_url) {
            profile_img = new ImageDTO();
            profile_img.url = req.file.profile_img_url;
        }

        const CreateAccount_Result = 
            await this.AccountService.CreateAccount(account_dto, profile_img);
        
        if(!CreateAccount_Result) { throw new UnauthorizedException() }

        const _access_token = AccessTokenGenerator(CreateAccount_Result);
        const _refresh_token = RefreshTokenGenerator(CreateAccount_Result);

        await this.AuthService.SaveRefreshTokenDirectly(CreateAccount_Result, _refresh_token);

        return {
            data: {
                access_token: _access_token,
                refresh_token: _refresh_token,
                pk: CreateAccount_Result.pk
            }
        };
    }

    @Post('/account')
    async account(
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;
        const token = res.locals.token;

        if(!user_pk || !token){ throw new UnauthorizedException() }

        const ValidateRefreshToken_Result = await this.AuthService.ValidateRefreshToken(
            user_pk, 
            token
        );

        if(!ValidateRefreshToken_Result){ throw new UnauthorizedException() }

        return { data: ValidateRefreshToken_Result };
    }

    @Delete()
    // @UseBefore(VerifyAccessToken)
    async delete(
        @Body() body,
        @Res() res: Response
    ) {
        const user_pk = res.locals.jwt_payload.pk;

        const DeleteProfile_Result = await this.AccountService.DeleteAccount(
            user_pk,
            body.password
        );

        if(!DeleteProfile_Result){ throw new UnauthorizedException() }

        return { data : DeleteProfile_Result };
    }

}