import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class CreateToolDbDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'The title of the tool', example: 'Tool Name' })
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'The image file of the tool (PNG, JPG or JPEG)',
    })
    image: string;
}