import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TournamentWithId } from '../../constants';

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  async getTournamentById(id: number): Promise<any> {
    return await this.prisma.tournament.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateTournamentResults(tournament: TournamentWithId): Promise<any> {
    const tournamentJson = JSON.parse(JSON.stringify(tournament.tournamentData));
    return await this.prisma.tournament.update({
      where: {
        id: tournament.id,
      },
      data: { tournamentData: tournamentJson, lastUpdated: tournament.lastUpdated },
    });
  }

  async getAll(): Promise<any[]> {
    return await this.prisma.tournament.findMany();
  }
}
