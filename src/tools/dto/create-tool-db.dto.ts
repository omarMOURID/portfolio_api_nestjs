import { IsString, IsNotEmpty } from "class-validator";


export class CreateToolDbDto {
    @IsNotEmpty()
    @IsString()
    title: String;

    @IsNotEmpty()
    @IsString()
    image: String;
}