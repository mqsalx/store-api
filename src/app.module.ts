import { CacheModule } from "@nestjs/cache-manager"
import { ClassSerializerInterceptor, ConsoleLogger, Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core"
import { TypeOrmModule } from "@nestjs/typeorm"
import { redisStore } from "cache-manager-redis-yet"
import { PostgresConfigService } from "src/config/db.config"
import { GlobalExceptionFilter } from "./resources/filters/global-exception-filter"
import { OrderModule } from "./modules/order/order.module"
import { ProductModule } from "./modules/product/product.module"
import { UserModule } from "./modules/user/user.module"
import { AuthModule } from './modules/auth/auth.module';
import { LoggerGlobalInterceptor } from "./resources/interceptors/logger-global/logger-global.interceptor"

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    OrderModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 3600 * 1000 })
      }),
      isGlobal: true
    }),
    AuthModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor
    },
    ConsoleLogger
  ]
})
export class AppModule {}
