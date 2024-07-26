import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import { OrderStatus } from "./enum/statupedido.enum"
import { UserEntity } from "../user/user.entity"
import { ItemOrderEntity } from "./itemorder.entity"

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string
  @Column({ name: "total_value", nullable: false })
  totalValue: number
  @Column({ name: "status", enum: OrderStatus, nullable: false })
  status: OrderStatus
  @CreateDateColumn({ name: "created_at" })
  created_at: Date
  @CreateDateColumn({ name: "updated_at" })
  updated_at: Date
  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date
  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity
  @OneToMany(() => ItemOrderEntity, (itemOrder) => itemOrder.order, { cascade: true })
  itemsOrder: ItemOrderEntity[]
}
