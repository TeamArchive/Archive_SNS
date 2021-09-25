import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import secretKey from '@root/secret-key.json';
import { any } from '@hapi/joi';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        // private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // Token 값을 헤더에 Bearer Token 값으로 포함하여 호출해야 서버단에서 토큰을 받아 검사
            ignoreExpiration: false,
            secretOrKey: secretKey.jwt.secretKey
        });
    }

    async validate(payload: any) {
        console.log("in jwtStategy : ", payload)

        return {
            email: payload.name,
            pk: payload.sub
        }   //req.user 할당
    }
}