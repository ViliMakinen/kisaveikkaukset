import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../constants';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@Req() req: any): Promise<User> {
    return this.usersService.findOne(req.user.id);
  }

  @Post()
  async addNickName(@Body() data: any, @Req() req: any): Promise<any> {
    return await this.usersService.addNickName(req.user.id, data.nickName);
  }
}
