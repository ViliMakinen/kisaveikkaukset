import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any[] {
    return users;
  }
}
