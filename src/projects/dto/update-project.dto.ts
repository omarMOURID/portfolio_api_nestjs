import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsArray, IsMongoId, IsBoolean, IsOptional, IsNotEmpty } from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'A title for the project',
    })
    title: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'Bref details about the project',
    })
    description: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        required: false,
        description: 'A Github link of the project',
    })
    link: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
        description: 'An image describing the project'
    })
    image: string;

    @IsArray()
    @IsMongoId({each: true})
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'array',
        required: false,
        description: 'A list of objectId of Tool object, to specify the tools and technologies used in that project',
    })
    tools: string[];

    @IsBoolean()
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({
        type: 'boolean',
        required: false,
        description: 'The active field give us the ability to show or hide the project',
    })
    active: boolean;
}