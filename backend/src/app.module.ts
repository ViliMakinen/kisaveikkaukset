import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { TournamentsController } from './tournaments/tournaments.controller';
import { AppController } from './app.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController, TournamentsController],
  providers: [],
})
export class AppModule {}
