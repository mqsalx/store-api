import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common"
import { Request, Response } from "express"
import { Observable, tap } from "rxjs"
import { RequestWithUser } from "src/modules/auth/auth.guard"

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = context.switchToHttp()
    const request = contextHttp.getRequest< Request | RequestWithUser>()
    const response = contextHttp.getResponse<Response>()
    const { path, method } = request
    const { statusCode } = response
    this.logger.log(
      `Request to ${method} ${path}`
    )
    const instantPreController = Date.now()
    return next.handle().pipe(
      tap(() => {
        if("user" in request) {
          this.logger.log(
            `Route accessed by user ${request.user.sub}`
          )
        }
        const timeExecutionRoute = Date.now() - instantPreController
        this.logger.log(
          `Response: status ${statusCode} - ${timeExecutionRoute}ms`
        )
      })
    )
  }
}
