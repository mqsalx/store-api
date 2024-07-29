import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { CreateOrderDTO } from "./dto/create-order.dto"
import { OrderService } from "./order.service"
import { UpdateOrderDTO } from "./dto/update-order.dto"

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: UpdateOrderDTO,
  ) {
    return this.orderService.update(id, data);
  }
}
