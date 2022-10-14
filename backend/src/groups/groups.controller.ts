import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupService: GroupsService) {}

  @Get()
  async getAll(): Promise<any> {
    return await this.groupService.getAll();
  }

  @Get(':id')
  getGroupById(@Param('id') id: string): Promise<any> {
    // remove the Promise.resolve and replace with a call to the groups service where the actual database query is made
    // remember to update the return type from any to something relevant
    return Promise.resolve({});
  }

  @Post()
  createGroup(@Body() group: any): Promise<any> {
    // remove the Promise.resolve and replace with a call to the groups service where the actual database query is made
    // remember to update the return type from any to something relevant
    return Promise.resolve({});
  }
}
