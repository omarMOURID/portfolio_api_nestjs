import { Controller, Get, Put, Delete, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'Get user details',
        type: User,
    })
    @ApiOperation({ summary: 'Get user details' })
    async getUserDetails(): Promise<User> {
        const user = await this.userService.getOrCreateUser();

        return user;
    }

    @Put()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user details' })
    @ApiResponse({
        status: 200,
        description: 'Update user details',
        type: User,
    })
    async updateUserDetails(@Body() userDetails: UserDto): Promise<User> {
        const user = await this.userService.updateUser(userDetails);
        return user;
    }

    @Put("/image")
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Update user image' })
    @ApiResponse({
        status: 200,
        description: 'Update user image',
        type: User,
    })
    @ApiBody({
        schema: {
            type: 'object',            
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async updateImage(@Body("image") image: string): Promise<User> {
        const user = await this.userService.updateUserPhoto(image);
        return user;
    }

    @Delete("/image")
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user image' })
    @ApiResponse({
        status: 200,
        description: 'Delete user image',
        type: User,
    })
    async deleteImage(): Promise<User> {
        const user = await this.userService.deleteUserImage();
        return user;
    }
}