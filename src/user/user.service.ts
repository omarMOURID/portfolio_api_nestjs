import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { join } from 'path';
import { unlinkSync } from 'fs';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async getOrCreateUser(): Promise<UserDocument> {
        let user = await this.userModel.findOne().exec();
        if(!user) {
            user = new this.userModel();
            user.save();
        }
        return user;
    }

    async updateUser(userDto: UserDto): Promise<UserDocument> {
        const user = await this.getOrCreateUser();

        userDto.firstname && (user.firstname = userDto.firstname);
        userDto.lastname && (user.lastname = userDto.lastname);
        userDto.age && (user.age = userDto.age);
        userDto.description && (user.description = userDto.description);

        if(userDto.socialMedia) {
            if (userDto.socialMedia.length > 0) {
                userDto.socialMedia.forEach(sc => {
                    if ((sc.type != "github" && sc.type != "linkedIn" && sc.type != "instagram")) throw new BadRequestException("the social media type should be in [github, linkedIn, instagram]");
                });
    
                if (!(userDto.socialMedia[0].type != userDto.socialMedia[1].type && userDto.socialMedia[0].type != userDto.socialMedia[2].type && userDto.socialMedia[1].type != userDto.socialMedia[2].type)) {
                    throw new BadRequestException("the social media type should have max one link for evey type [github, linkedIn, instagram]");
                }
            }
            
            user.socialMedia = userDto.socialMedia;
        }
        

        await user.save();

        return user;
    }

    async updateUserPhoto(image: string): Promise<UserDocument> {
        const user = await this.getOrCreateUser();

        if(user.image) {
            const path = join(__dirname, '..', '..', 'upload', user.image.toString());
            unlinkSync(path);
        } 
        user.image = image;

        await user.save();
        
        return user;
    }

    async deleteUserImage(): Promise<UserDocument> {
        const user = await this.getOrCreateUser();

        if(!user.image) {
            throw new BadRequestException("User doesn't have any image");
        } 
        
        const path = join(__dirname, '..', '..', 'upload', user.image.toString());
        unlinkSync(path);

        user.image = null;

        await user.save();

        return user;
    }
}
