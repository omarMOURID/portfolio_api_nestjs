import { IsString, IsNotEmpty, Validate, IsBoolean, IsOptional  } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { CreateEducationDto, IsYear } from "./create-education.dto";


export class UpdateEducationDto extends CreateEducationDto {
    @IsOptional()
    title: string;

    @IsOptional()
    location: string;

    @IsOptional()
    description: string;

    @IsOptional()
    from: string;

    @IsOptional()
    to: string;

    @IsOptional()
    inProgress: boolean;
}