import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards
} from "@nestjs/common"
import { AuthGuard, RequestWithUser } from "../auth/auth.guard"
import { CreateOrderDTO } from "./dto/create-order.dto"
import { UpdateOrderDTO } from "./dto/update-order.dto"
import { OrderService } from "./order.service"

@UseGuards(AuthGuard)
@Controller("/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Req() req: RequestWithUser, @Body() orderData: CreateOrderDTO) {
    const userId = req.user.sub
    const createdOrder = await this.orderService.create(userId, orderData)
    return createdOrder
  }

  @Get()
  async list(@Req() req: RequestWithUser) {
    const userId = req.user.sub
    const orders = await this.orderService.list(userId)
    return orders
  }

  @Patch(":id")
  async update(
    @Req() req: RequestWithUser,
    @Param("id") id: string,
    @Body() data: UpdateOrderDTO
  ) {
    const userId = req.user.sub
    const updatedOrder = await this.orderService.update(id, data, userId)
    return updatedOrder
  }
}
