import { IsString, IsNotEmpty, IsArray, IsMongoId } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'A title for the project',
    })
    title: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @ApiProperty({
        type: 'string',
        description: 'Bref details about the project',
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        description: 'A Github link of the project',
    })
    link: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'An image describing the project'
    })
    image: string;

    @IsArray()
    @IsNotEmpty()
    @IsMongoId({each: true})
    @ApiProperty({
        type: 'string',
        isArray: true,
        description: 'A list of objectId of Tool object, to specify the tools and technologies used in that project',
    })
    tools: string[];
}