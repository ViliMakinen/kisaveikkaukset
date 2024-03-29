import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { TournamentsController } from './tournaments/tournaments.controller';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OAuth2GoogleConfig } from './config/oauth2-google.config';
import { UsersService } from './users/users.service';
import { GroupsController } from './groups/groups.controller';
import { TournamentsService } from './tournaments/tournaments.service';
import { GroupsService } from './groups/groups.service';
import { CodeController } from './code/code.controller';
import { PredictionsController } from './predictions/predictions.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [OAuth2GoogleConfig],
    }),
    AuthModule,
  ],
  controllers: [
    AppController,
    UsersController,
    TournamentsController,
    GroupsController,
    CodeController,
    PredictionsController,
  ],
  providers: [PrismaService, UsersService, TournamentsService, GroupsService],
})
export class AppModule {}
