import { IsString, IsArray, IsMongoId, IsBoolean, IsOptional } from "class-validator";

export class UpdateProjectDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    link: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsArray()
    @IsMongoId({each: true})
    @IsOptional()
    tools: string[];

    @IsBoolean()
    @IsOptional()
    active: boolean;
}