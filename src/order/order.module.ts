import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "src/user/user.entity"
import { OrderController } from "./order.controller"
import { OrderEntity } from "../order/order.entity"
import { OrderService } from "../order/order.service"
import { ProductModule } from "src/product/product.module"


@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity]), ProductModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
