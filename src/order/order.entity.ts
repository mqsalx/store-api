import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm"
import { OrderStatus } from "./enum/statupedido.enum"

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string
  @Column({ name: "total_value", nullable: false })
  totalValue: number
  @Column({ name: "status", enum: OrderStatus, nullable: false })
  status: OrderStatus
  @Column({ name: "password", length: 255, nullable: false })
  password: string
  @CreateDateColumn({ name: "created_at" })
  created_at: Date
  @CreateDateColumn({ name: "updated_at" })
  updated_at: Date
  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date
}
