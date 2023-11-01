import { IsString, IsNotEmpty, Validate, IsBoolean, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';



@ValidatorConstraint({ name: 'yearValidator', async: false })
export class IsYear implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean {
        return /^\d{4}$/.test(text); // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments): string {
        // here you can provide default error message if validation failed
        return '$property ($value) is not a valide year form';
    }
}


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

    @IsNotEmpty()
    @Validate(IsYear)
    @ApiProperty({ type: String, description: 'Starting year of the education' })
    from: string;

    @IsNotEmpty()
    @Validate(IsYear)
    @ApiProperty({ type: String, description: 'Ending year of the education' })
    to: string;

    @IsBoolean()
    @ApiProperty({ type: Boolean, description: 'Indicates if the education is in progress' })
    inProgress: boolean;
}
