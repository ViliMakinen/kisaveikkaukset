import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Tournament, TournamentWithId } from '../../constants';
import { TournamentService } from './tournament.service';

@Controller('tournaments')
export class TournamentsController {
  constructor(private tournamentService: TournamentService) {}

  @Get()
  getAll(): Promise<TournamentWithId[]> {
    return this.tournamentService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Tournament> {
    const tournament = await this.tournamentService.getTournamentById(parseInt(id, 10));
    return tournament.tournamentData;
  }

  @Post()
  async create(@Body() tournament: Tournament): Promise<Tournament> {
    return (await this.tournamentService.saveTournamentResults(tournament)).tournamentData;
  }
}
