import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { authConstant } from './auth.constant';

@Injectable()
export class AuthService {

    private readonly user = {
        username: authConstant.username,
        password: authConstant.password
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
