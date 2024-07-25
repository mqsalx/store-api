import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { UserEntity } from "src/user/user.entity"
import { Repository } from "typeorm"
import { CreateOrderDTO } from "./dto/create-order.dto"
import { OrderStatus } from "./enum/statupedido.enum"
import { ItemOrderEntity } from "./itemorder.entity"
import { OrderEntity } from "./order.entity"

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async create(userId: string, orderData: CreateOrderDTO) {
    const user = await this.userRepository.findOneBy({ id: userId })
    const orderEntity = new OrderEntity()

    orderEntity.status = OrderStatus.IN_PROGRESS
    orderEntity.user = user

    const itemsOrderEntity = orderData.itemsOrder.map((itemOrder) => {
      const itemOrderEntity = new ItemOrderEntity()
      itemOrderEntity.salePrice = 10
      itemOrderEntity.amount = itemOrder.amount
      return itemOrderEntity
    })

    const totalValue = itemsOrderEntity.reduce((total, item) => {
      return total + item.salePrice * item.amount
    }, 0)

    orderEntity.itemsOrder = itemsOrderEntity
    orderEntity.totalValue = totalValue

    const createdOrder = await this.orderRepository.save(orderEntity)
    return createdOrder
  }
  async list(userId: string) {
    return this.orderRepository.find({
      where: {
        user: { id: userId }
      },
      relations: {
        user: true
      }
    })
  }
}
