import {Controller, Get} from '@nestjs/common';
import {MockUser} from "../../constants";

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


    @Get()
    getHello(): MockUser[] {
        return users;
    }
}