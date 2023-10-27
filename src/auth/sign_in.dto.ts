import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: "string",
        required: true,
    })
    username: String;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: "string",
        required: true
    })
    password: String;
}