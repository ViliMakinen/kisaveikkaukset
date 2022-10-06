import { Controller, Get, Req } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { MockUser } from '../../constants';
import { UsersService } from './users.service';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const users = [
  {
    name: 'aapo',
    points: 15,
    admin: true,
  },
  {
    name: 'viltsu',
    points: 16,
    admin: true,
  },
  {
    name: 'osku',
    points: 10,
    admin: true,
  },
  {
    name: 'elmo',
    points: 9,
    admin: true,
  },
  {
    name: 'matti',
    points: 6,
    admin: true,
  },
];

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get()
  getUsers(): Observable<MockUser[]> {
    return of(users);
  }

  @Get('me')
  async getMe(@Req() req: any): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }
}
