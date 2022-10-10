import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './users.controller';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async getOrCreate(user: any): Promise<any> {
    return await this.prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {},
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { id: id },
    });
  }
}