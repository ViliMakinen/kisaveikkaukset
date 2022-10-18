import { Body, Controller, Post, Req } from '@nestjs/common';
import { GroupsService } from '../groups/groups.service';

@Controller('code')
export class CodeController {
  constructor(private groupService: GroupsService) {}

  @Post()
  async joinGroup(@Body() data: any, @Req() req: any): Promise<any> {
    return await this.groupService.joinGroup(data.code, req.user.id);
  }
}
