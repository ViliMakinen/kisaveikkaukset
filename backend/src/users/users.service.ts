import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ExtraPredictions, MatchResult, User } from '../../constants';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getOrCreate(user: any): Promise<any> {
    return await this.prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        email: user.email,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
      },
    });
  }

  async addNickName(id: number, nickName: string): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        nickName,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async updatePredictions(
    predictions: { predictions: MatchResult[]; extraPredictions: ExtraPredictions },
    groupId: number,
    userId: number,
  ): Promise<any> {
    const predictionsJson = JSON.parse(JSON.stringify(predictions));
    return await this.prisma.userGroupPredictions.update({
      where: { userId_groupId: { userId, groupId } },
      data: { predictions: predictionsJson },
    });
  }
}
