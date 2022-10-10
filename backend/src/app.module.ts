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
import { TournamentService } from './tournaments/tournament.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [OAuth2GoogleConfig],
    }),
    AuthModule,
  ],
  controllers: [AppController, UsersController, TournamentsController, GroupsController],
  providers: [PrismaService, UsersService, TournamentService],
})
export class AppModule {}
