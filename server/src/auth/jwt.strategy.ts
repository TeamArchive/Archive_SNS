import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { In } from 'typeorm';

const fromAuthCookie = () => {
    return (request) => {
        let token = null;

        if(request && request.cookies) {
            token = request.cookies['Authorization'];
        }

        return token;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService
    ) {
        super({
            jwtFromRequest: fromAuthCookie(),
            ignoreExpiration: false,
            secretOrKey: 'jwt secret key'
        });
    }

    async validate( payload: any ) {
        return { 
            email: payload.email, 
            name: payload.name 
        }
    }
}