import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {
    @IsEmail(undefined, { message: "Invalid email!" })
    email: string

    @IsNotEmpty({ message: "Password cannot be empty!" })
    password: string
}
