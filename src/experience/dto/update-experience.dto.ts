import { IsNotEmpty, IsNumber, IsString, Validate, IsPositive, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { CreateExperienceDto } from "./create-experience.dto";

export class UpdateExperiencDto extends CreateExperienceDto{
    @IsOptional()
    title: string;
    
    @IsOptional()
    description: string;

    @IsOptional()
    company: string;

    @IsOptional()
    durationInMonths: number;

    @IsOptional()
    carriedAt: string;
}