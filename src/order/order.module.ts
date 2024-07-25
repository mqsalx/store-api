import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "src/user/user.entity"
import { OrderController } from "./order.controller"
import { OrderEntity } from "../order/order.entity"
import { OrderService } from "../order/order.service"


@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
