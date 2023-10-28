import { IsString, IsNotEmpty, Validate, IsBoolean  } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export const isValidYear = (value: string) => /^\d{4}$/.test(value);
export class CreateEducationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Title of the education' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Location of the education' })
    location: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Description of the education' })
    description: string;

    @Validate((value: string) => isValidYear(value), {
        message: 'From must be a valid year',
    })
    @ApiProperty({ type: String, description: 'Starting year of the education' })
    from: string;

    @Validate((value: string) => isValidYear(value), {
        message: 'To must be a valid year',
    })
    @ApiProperty({ type: String, description: 'Ending year of the education' })
    to: string;

    @IsBoolean()
    @ApiProperty({ type: Boolean, description: 'Indicates if the education is in progress' })
    inProgress: boolean;
}
