import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OAuth2GoogleStrategy } from './oauth2-google-strategy.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SIGNING_KEY'),
            }),
            inject: [ConfigService],
        }),
        UsersModule,
    ],
    providers: [AuthService, OAuth2GoogleStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {
}
