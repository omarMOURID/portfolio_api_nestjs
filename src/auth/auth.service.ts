import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    private readonly user = {
        username: process.env.LOGIN_USERNAME,
        password: process.env.LOGIN_PASSWORD
    };

    constructor(
        private readonly jwtService: JwtService, 
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        if (this.user.username !== username || !bcrypt.compare(pass, this.user.password)) {
            throw new UnauthorizedException();
        }
        const payload = { username: this.user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}
