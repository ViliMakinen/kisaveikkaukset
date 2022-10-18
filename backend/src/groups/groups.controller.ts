import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupWithIdAndName, PlayerGroup } from '../../constants';

@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Get()
  async getAllUsersGroups(@Req() req: any): Promise<GroupWithIdAndName[]> {
    return await this.groupService.getAllUsersGroups(req.user.id);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<PlayerGroup> {
    return await this.groupService.getGroupById(parseInt(id, 10));
  }

  @Post()
  async createGroup(@Body() data: any, @Req() req: any): Promise<any> {
    return await this.groupService.createGroup(data.groupName, data.tournamentId, req.user.id);
  }
}
