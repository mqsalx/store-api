import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PostgresConfigService } from "src/config/db.config"
import { ProductModule } from "./product/product.module"
import { UserModule } from "./user/user.module"
import { OrderModule } from './order/order.module';

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
    OrderModule
  ]
})
export class AppModule {}
