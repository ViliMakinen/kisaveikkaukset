import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request): string => {
                    if (!request || !request.cookies) {
                        return null;
                    }
                    return request.cookies['AuthToken'];
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SIGNING_KEY'),
        });
    }

    async validate(user: any): Promise<any> {
        return user;
    }
}
