import { IsString, IsNotEmpty, IsArray, IsMongoId } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    link: string;

    @IsString()
    image: string;

    @IsArray()
    @IsNotEmpty()
    @IsMongoId({each: true})
    tools: string[];
}