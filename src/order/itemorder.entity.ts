import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { OrderEntity } from "./order.entity"
import { ProductEntity } from "src/product/product.entity"

@Entity({ name: "items_orders" })
export class ItemOrderEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string
  @Column({ name: "amount", nullable: false })
  amount: number
  @Column({ name: "sale_price", nullable: false })
  salePrice: number
  @ManyToOne(() => OrderEntity, (order) => order.itemsOrder, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  order: OrderEntity
  @ManyToOne(() => ProductEntity, (product) => product.itemsOrder, {
    cascade: ["update"]
  })
  product: ProductEntity
}
