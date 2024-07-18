import { IsEmail, IsOptional, IsString, MinLength } from "class-validator"
import { UniqueEmail } from "../validation/uniqueEmail.Validator"

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name: string

  @IsEmail()
  @UniqueEmail({ message: "Email already exists!" })
  @IsOptional()
  email: string

  @MinLength(6)
  @IsOptional()
  password: string
}
