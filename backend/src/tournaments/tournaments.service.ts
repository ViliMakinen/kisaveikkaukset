import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tournament } from '../../constants';

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

  async saveTournamentResults(tournament: Tournament): Promise<any> {
    const tournamentJson = JSON.parse(JSON.stringify(tournament));
    return await this.prisma.tournament.update({
      where: {
        id: 2,
      },
      data: { tournamentData: tournamentJson },
    });
  }

  async getAll(): Promise<any[]> {
    return await this.prisma.tournament.findMany();
  }
}
