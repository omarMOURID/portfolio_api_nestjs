import { IsString, IsNotEmpty, Validate, IsBoolean, IsOptional  } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { isValidYear } from "./create-education.dto";


export class UpdateEducationDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ type: String, required: false, description: 'Title of the education' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ type: String, required: false, description: 'Location of the education' })
    location: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ type: String, required: false, description: 'Description of the education' })
    description: string;

    @Validate((value: string) => isValidYear(value), {
        message: 'From must be a valid year',
    })
    @IsOptional()
    @ApiProperty({ type: String, required: false, description: 'Starting year of the education' })
    from: string;

    @Validate((value: string) => isValidYear(value), {
        message: 'To must be a valid year',
    })
    @IsOptional()
    @ApiProperty({ type: String, required: false, description: 'Ending year of the education' })
    to: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ type: Boolean, required: false, description: 'Indicates if the education is in progress' })
    inProgress: Boolean;
}