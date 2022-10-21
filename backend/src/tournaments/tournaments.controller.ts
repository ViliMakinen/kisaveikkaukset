import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Tournament, TournamentWithId } from '../../constants';
import { TournamentsService } from './tournaments.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private tournamentService: TournamentsService) {}

  @Get()
  async getAll(): Promise<TournamentWithId[]> {
    return await this.tournamentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Tournament> {
    const tournament = await this.tournamentService.getTournamentById(parseInt(id, 10));
    return tournament.tournamentData;
  }

  @Post()
  async update(@Body() tournament: TournamentWithId): Promise<TournamentWithId> {
    return await this.tournamentService.updateTournamentResults(tournament);
  }
}
