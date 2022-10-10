import { Body, Controller, Get, Param, Post } from '@nestjs/common';

function generateRandomCode(length: number): string {
  // a function to generate the random code for groups
  // move this to the groups service when that is created
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

@Controller('groups')
export class GroupsController {
  @Get()
  getAll(): Promise<any[]> {
    // remove the Promise.resolve and replace with a call to the groups service where the actual database query is made
    // remember to update the return type from any to something relevant
    return Promise.resolve([]);
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
