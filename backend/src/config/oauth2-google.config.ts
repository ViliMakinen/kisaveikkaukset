import { registerAs } from '@nestjs/config';

export const OAuth2GoogleConfig = registerAs('oauth2-google', () => ({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: `${process.env.DOMAIN}/api/oauth2/google/callback`,
}));
