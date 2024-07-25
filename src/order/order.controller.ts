import { Body, Controller, Get, Post, Query } from "@nestjs/common"
import { OrderService } from "./order.service"
import { CreateOrderDTO } from "./dto/create-order.dto"

@Controller("/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Query("userId") userId: string,
    @Body() orderData: CreateOrderDTO
  ) {
    const createdOrder = await this.orderService.create(userId, orderData)
    return createdOrder
  }

  @Get()
  async list(@Query("userId") userId: string) {
    const orders = await this.orderService.list(userId)
    return orders
  }
}
