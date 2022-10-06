import { StrategyOptionsWithRequest, VerifyCallback } from 'passport-oauth2';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class OAuth2GoogleStrategy extends PassportStrategy(GoogleStrategy, 'oauth2-google') {
    constructor(private authService: AuthService, private configService: ConfigService) {
        super(
            {
                clientID: configService.get('oauth2-google.clientId'),
                clientSecret: configService.get('oauth2-google.clientSecret'),
                callbackURL: configService.get('oauth2-google.callbackUrl'),
                passReqToCallback: true,
                scope: ['profile', 'email'],
                state: false,
            } as StrategyOptionsWithRequest,
            (req: Request, access: string, refresh: string, profile: any, done: VerifyCallback) => {
                this.authService
                    .handleOAuthResponse({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                    })
                    .then((user) => done(null, user))
                    .catch((error) => done(error));
            },
        );
    }
}
