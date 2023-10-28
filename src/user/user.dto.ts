import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsInt, IsNotEmpty, IsOptional, IsArray, ArrayMaxSize, IsEnum, IsPhoneNumber, ValidateNested, IsUrl } from "class-validator";


export enum SocialMediaType {
    Github = 'github',
    LinkedIn = 'linkedIn',
    Instagram = 'instagram',
}

export class SocialMediaDto {
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        type: String,
        description: 'the link of a sociel media plateform',
    })
    link: String;
    
    @IsNotEmpty()
    @IsEnum(SocialMediaType)
    @ApiProperty({
        type: String,
        description: 'the type of sociel media plateform (github, linkedIn, instagram)',
    })
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

    @IsPhoneNumber()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'user phone number',
    })
    phoneNumber: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'user address',
    })
    location: string;

    @ArrayMaxSize(3)
    @IsArray()
    @IsOptional({each: true})
    @ValidateNested({each: true})
    @Type(() => SocialMediaDto)
    @ApiProperty({
        isArray: true,
        type: SocialMediaDto,
        required: false,
        description: 'A list of social media links',
    })
    socialMedia: SocialMediaDto[];

}