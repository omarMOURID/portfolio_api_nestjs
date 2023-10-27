import { Controller, Get, Put, Delete, Body, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from './user.schema';
import { UserDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUserDetails(): Promise<User> {
        const user = await this.userService.getOrCreateUser();

        return user;
    }

    @Put()
    async updateUserDetails(@Body() userDetails: UserDto): Promise<User> {
        const user = await this.userService.updateUser(userDetails);
        return user;
    }

    @Put("/image")
    @UseInterceptors(FileInterceptor('image'))
    @ApiConsumes('multipart/form-data')
    async updateImage(@Body("image") image: string): Promise<User> {
        const user = await this.userService.updateUserPhoto(image);
        return user;
    }

    @Delete("/image")
    async deleteImage(): Promise<User> {
        const user = await this.userService.deleteUserImage();
        return user;
    }
}
