/* eslint-disable @typescript-eslint/no-unused-vars */
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { UserPayload } from "./auth.service"

export interface RequestWithUser extends Request {
  user: UserPayload
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const token = this.extractToken(request)
    if(!token) {
      throw new UnauthorizedException("Unauthorized!")
    }
    try{
      const payload: UserPayload = await this.jwtService.verifyAsync(token)
      request.user = payload
    } catch {
      throw new UnauthorizedException("Invalid token!")
    }
    return false
  }
  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}
