import {Injectable} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {ConfigService} from '@nestjs/config'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {Request} from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies?.access_token;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
