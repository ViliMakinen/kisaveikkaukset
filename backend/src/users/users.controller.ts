import { Controller, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../constants';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: any): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }
}
