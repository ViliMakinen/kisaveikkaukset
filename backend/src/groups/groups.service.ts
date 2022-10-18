import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GroupWithIdAndName, MatchResult, PlayerGroup } from '../../constants';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  generateRandomCode(length: number): string {
    let result = '';
    const characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async getGroupById(id: number): Promise<PlayerGroup> {
    const group = await this.prisma.group.findUnique({
      where: {
        id: id,
      },
      include: {
        UserGroupPredictions: {
          include: {
            user: true,
          },
        },
      },
    });
    return {
      name: group.name,
      code: group.code,
      tournamentId: group.tournamentId,
      groupId: group.id,
      users: group.UserGroupPredictions.map((user) => {
        return {
          predictions: JSON.parse(JSON.stringify(user.predictions)) as MatchResult[],
          firstName: user.user.firstName,
          lastName: user.user.lastName,
        };
      }),
    };
  }

  async getAllUsersGroups(userId: number): Promise<GroupWithIdAndName[]> {
    const userGroups = await this.prisma.userGroupPredictions.findMany({
      where: {
        userId,
      },
      select: {
        group: true,
      },
    });
    return userGroups.map((group) => {
      return {
        groupId: group.group.id,
        groupName: group.group.name,
      };
    });
  }

  async createGroup(groupName: string, tournamentId: number, userId: number): Promise<any> {
    const code = this.generateRandomCode(5);
    return await this.prisma.group.create({
      data: {
        tournament: { connect: { id: tournamentId } },
        name: groupName,
        code: code,
        UserGroupPredictions: { create: { user: { connect: { id: userId } }, predictions: [] } },
      },
    });
  }

  async joinGroup(code: string, userId: number): Promise<any> {
    const groupByCode = await this.prisma.group.findFirst({
      where: {
        code,
      },
    });
    if (groupByCode === null) {
      throw Error;
    }
    return await this.prisma.userGroupPredictions.upsert({
      where: {
        userId_groupId: {
          userId,
          groupId: groupByCode.id,
        },
      },
      update: {},
      create: {
        user: {
          connect: {
            id: userId,
          },
        },
        group: {
          connect: {
            id: groupByCode.id,
          },
        },
        predictions: [],
      },
    });
  }
}
