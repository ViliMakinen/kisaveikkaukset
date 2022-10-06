import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) {
    }

    async handleOAuthResponse(tokenData: any): Promise<any> {
        const firstName = tokenData.firstName;
        const lastName = tokenData.lastName;
        const email = tokenData.email;

        const userData = await this.userService.getOrCreate({ firstName, lastName, email });
        const token = this.jwtService.sign(userData);
        return { token, userData };
    }
}
