import { IsEnum } from "class-validator"
import { OrderStatus } from "../enum/statupedido.enum"

export class UpdateOrderDTO {
  @IsEnum(OrderStatus)
  status: OrderStatus
}
