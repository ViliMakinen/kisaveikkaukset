import { Controller, Get, Param } from '@nestjs/common';
import { MatchResult, Tournament, TournamentWithId } from '../../constants';
import { TournamentService } from './tournament.service';

// the results will be stored inside the Tournament in the future
const results: MatchResult[] = [
  {
    id: 1,
    result: '1',
  },
  {
    id: 2,
    result: 'X',
  },
  {
    id: 3,
    result: '2',
  },
  {
    id: 4,
    result: '1',
  },
  {
    id: 5,
    result: '1',
  },
  {
    id: 6,
    result: 'X',
  },
  {
    id: 7,
    result: '2',
  },
  {
    id: 8,
    result: '1',
  },
  {
    id: 9,
    result: 'X',
  },
  {
    id: 10,
    result: null,
  },
  {
    id: 11,
    result: null,
  },
  {
    id: 12,
    result: null,
  },
  {
    id: 13,
    result: null,
  },
  {
    id: 14,
    result: null,
  },
  {
    id: 15,
    result: null,
  },
  {
    id: 16,
    result: null,
  },
  {
    id: 17,
    result: null,
  },
  {
    id: 18,
    result: null,
  },
  {
    id: 19,
    result: null,
  },
  {
    id: 20,
    result: null,
  },
  {
    id: 21,
    result: null,
  },
  {
    id: 22,
    result: null,
  },
  {
    id: 23,
    result: null,
  },
  {
    id: 24,
    result: null,
  },
  {
    id: 25,
    result: null,
  },
  {
    id: 26,
    result: null,
  },
  {
    id: 27,
    result: null,
  },
  {
    id: 28,
    result: null,
  },
  {
    id: 29,
    result: null,
  },
  {
    id: 30,
    result: null,
  },
  {
    id: 31,
    result: null,
  },
  {
    id: 32,
    result: null,
  },
  {
    id: 33,
    result: null,
  },
  {
    id: 34,
    result: null,
  },
  {
    id: 35,
    result: null,
  },
  {
    id: 36,
    result: null,
  },
  {
    id: 37,
    result: null,
  },
  {
    id: 38,
    result: null,
  },
  {
    id: 39,
    result: null,
  },
  {
    id: 40,
    result: null,
  },
  {
    id: 41,
    result: null,
  },
  {
    id: 42,
    result: null,
  },
  {
    id: 43,
    result: null,
  },
  {
    id: 44,
    result: null,
  },
  {
    id: 45,
    result: null,
  },
  {
    id: 46,
    result: null,
  },
  {
    id: 47,
    result: null,
  },
  {
    id: 48,
    result: null,
  },
];

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
}
