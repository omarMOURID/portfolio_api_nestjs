import { Controller, Post, Body } from '@nestjs/common';
import { SignInDto } from './sign_in.dto';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @ApiOperation({ summary: 'User Login', description: 'Authenticate a user based on provided credentials.' })
    @ApiResponse({ status: 201, description: 'User has been successfully logged in.' })
    async login(@Body() signInDto: SignInDto): Promise<any> {
        return await this.authService.signIn(
            signInDto.username.toString(), 
            signInDto.password.toString()
        );
    }
}
