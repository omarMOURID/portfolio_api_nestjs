import { IsString, IsNotEmpty } from "class-validator";


export class SignInDto {
    @IsNotEmpty()
    @IsString()
    username: String;

    @IsNotEmpty()
    @IsString()
    password: String;
}