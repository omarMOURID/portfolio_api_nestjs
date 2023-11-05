import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";


export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The name of the contact.',
        type: String,
    })
    name: string;

    
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email address of the contact.',
        type: String,
        format: 'email',
    })
    email: string;

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The subject of the contact message.',
        type: String,
    })
    subject: string;

    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The message content of the contact.',
        type: String,
    })
    message: string;
}