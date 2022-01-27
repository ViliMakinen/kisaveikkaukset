import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { SeededTournament, Tournament, tournaments, User } from '../constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  tournaments = tournaments;
  user: User | null;
  users: User[] | null = null;

  constructor(public userService: UserService) {
    userService.getUsers().then((users) => (this.users = users));
    this.user = userService.getCurrentUser();
  }

  realPlayers(tournament: Tournament | SeededTournament): User[] | null {
    const realPlayers = this.users !== null ? this.users!.filter((user) => user.name !== 'results') : [];
    const playersWithPoints = realPlayers.map((player) => {
      return { name: player, points: this.getPlayerTournamentPoints(player, tournament) };
    });
    playersWithPoints.sort((currentPlayer, nextPlayer) => nextPlayer.points! - currentPlayer.points!);
    return playersWithPoints.map((playerWithPoints) => playerWithPoints.name);
  }

  getPlayerTournamentPoints(player: User, tournament: Tournament | SeededTournament) {
    return player.predictions.find((prediction) => prediction.tournament === tournament.name)!.tournamentPoints;
  }
}
