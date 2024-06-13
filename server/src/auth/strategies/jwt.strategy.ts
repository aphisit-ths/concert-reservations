import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ConfigService} from '@nestjs/config';
import {Strategy, ExtractJwt} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    return req?.cookies?.access_token
                }
            ]),
            secretOrKey: configService.get('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: any) {
        return {userId: payload.sub, username: payload.username};
    }
}