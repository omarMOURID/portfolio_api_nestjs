import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsNotEmpty, IsOptional, IsArray, ArrayMaxSize, IsEnum, IsIn } from "class-validator";
import { type } from "os";


export enum SocialMediaType {
    Github = 'github',
    LinkedIn = 'linkedIn',
    Instagram = 'instagram',
}

export class socialMediaDto {
    @IsNotEmpty()
    @IsString()
    link: String;
    
    @IsNotEmpty()
    @IsEnum(SocialMediaType)
    type: SocialMediaType
}

export class UserDto {
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'user firstname',
    })
    firstname: String;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'user lastname',
    })
    lastname: String;

    @IsNotEmpty()
    @IsInt()
    @IsOptional()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'user age',
    })
    age: Number;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'user description',
    })
    description: string;

    @ArrayMaxSize(3)
    @IsArray()
    @IsOptional({each: true})
    @ApiProperty({
        isArray: true,
        type: socialMediaDto,
        description: 'A list of social media links',
    })
    socialMedia: socialMediaDto[];

}