import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { Payload } from '../dto/payload.dto';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
    constructor() { super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_REFRESH_SECRET,
        passReqToCallback: true
    })}

    validate(host: ExecutionContext, payload: Payload): any {
        return payload
    }
}