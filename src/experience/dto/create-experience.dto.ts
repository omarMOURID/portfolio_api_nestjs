import { IsNotEmpty, IsNumber, IsString, Validate, IsPositive } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IsYear } from "src/education/dto/create-education.dto";

export class CreateExperienceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Title of the experience' })
    title: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Description of the experience' })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Name of the company' })
    company: string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ type: Number, description: 'Duration in months of the experience' })
    durationInMonths: number;

    @IsString()
    @IsNotEmpty()
    @Validate(IsYear)
    @ApiProperty({ type: String, description: 'Year when the experience was carried out' })
    carriedAt: string;
}