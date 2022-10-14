import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  generateRandomCode(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async getAll(): Promise<any[]> {
    return await this.prisma.group.findMany();
  }

  async createGroup(groupName: string, tournamentId: number, userId: number) {
    const code = this.generateRandomCode(5);
    return await this.prisma.group.create({
      data: {
        tournament: { connect: { id: tournamentId } },
        name: groupName,
        code: code,
        UserGroupPredictions: { create: { user: { connect: { id: userId } }, predictions: [] } },
      },
    })
  }
}
