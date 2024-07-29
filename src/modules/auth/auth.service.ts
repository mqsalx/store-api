/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from "@nestjs/common"
import * as bcrypt from "bcrypt"
import { UserService } from "../user/user.service"
import { JwtService } from "@nestjs/jwt"

interface UserPayload {
  sub: string
  userName: string
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}
  async login(email: string, passwordProvided: string) {
    const user = await this.userService.findByEmail(email)
    const isValid = await bcrypt.compare(passwordProvided, user.password)
    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials!")
    }
    const payload: UserPayload = {
      sub: user.id,
      userName: user.name
    }
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
