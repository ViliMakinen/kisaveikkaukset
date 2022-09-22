import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersController} from "./users/users.controller";
import {TournamentsController} from "./tournaments/tournaments.controller";

@Module({
  imports: [],
  controllers: [AppController, UsersController, TournamentsController],
  providers: [AppService],
})
export class AppModule {
}
