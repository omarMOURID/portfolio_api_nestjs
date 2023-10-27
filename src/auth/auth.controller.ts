import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './sign_in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    async login(@Body() signInDto: SignInDto): Promise<any> {
        return await this.authService.signIn(
            signInDto.username.toString(), 
            signInDto.password.toString()
        );
    }
}
