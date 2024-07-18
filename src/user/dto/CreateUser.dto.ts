import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { UniqueEmail } from "../validation/uniqueEmail.Validator"

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @UniqueEmail({ message: "Email already exists!" })
  email: string

  @MinLength(6)
  password: string
}
