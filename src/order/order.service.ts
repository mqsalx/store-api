import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { In, Repository } from "typeorm"
import { ProductEntity } from "../product/product.entity"
import { UserEntity } from "../user/user.entity"
import { CreateOrderDTO } from "./dto/create-order.dto"
import { UpdateOrderDTO } from "./dto/update-order.dto"
import { OrderStatus } from "./enum/statupedido.enum"
import { ItemOrderEntity } from "./itemorder.entity"
import { OrderEntity } from "./order.entity"

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  private async findUser(id) {
    const user = await this.userRepository.findOneBy({ id })
    if (user === null) {
      throw new NotFoundException("User not found!")
    }
    return user
  }

  private async processOrderData(
    orderData: CreateOrderDTO,
    relatedProducts: ProductEntity[]
  ) {
    orderData.itemsOrder.forEach((itemOrder) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === itemOrder.productId
      )
      // if (relatedProduct === undefined) {
      if (!relatedProduct) {
        throw new NotFoundException("Product not found!")
      }
      if (itemOrder.amount > relatedProduct.availableQuantity) {
        throw new BadRequestException("Product out of stock!")
      }
    })
  }

  async create(userId: string, orderData: CreateOrderDTO) {
    const user = await this.findUser(userId)
    const orderEntity = new OrderEntity()

    const productsIds = orderData.itemsOrder.map(
      (itemOrder) => itemOrder.productId
    )
    const relatedProducts = await this.productRepository.findBy({
      id: In(productsIds)
    })

    orderEntity.status = OrderStatus.IN_PROGRESS
    orderEntity.user = user

    this.processOrderData(orderData, relatedProducts)

    const itemsOrderEntity = orderData.itemsOrder.map((itemOrder) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === itemOrder.productId
      )
      const itemOrderEntity = new ItemOrderEntity()
      itemOrderEntity.product = relatedProduct!
      itemOrderEntity.salePrice = relatedProduct!.value
      itemOrderEntity.amount = itemOrder.amount
      itemOrderEntity.product.availableQuantity -= itemOrder.amount
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

  async UpdateDateColumn(id: string, dto: UpdateOrderDTO) {
    const order = await this.orderRepository.findOneBy({ id })
    if (order === null) {
      throw new NotFoundException("Order not found!")
    }
    Object.assign(order, dto)
    await this.orderRepository.save(order)
  }
}