import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TournamentService {
  constructor(private prisma: PrismaService) {}

  async getTournamentById(id: number): Promise<any> {
    return await this.prisma.tournament.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getAll(): Promise<any[]> {
    return await this.prisma.tournament.findMany();
  }
}
