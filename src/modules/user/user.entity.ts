import { Exclude } from "class-transformer"
import { OrderEntity } from "../order/order.entity"
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string
  @Column({ name: "name", length: 100, nullable: false })
  name: string
  @Column({ name: "email", length: 70, nullable: false })
  email: string
  @Exclude()
  @Column({ name: "password", length: 255, nullable: false })
  password: string
  @CreateDateColumn({ name: "created_at" })
  created_at: Date
  @CreateDateColumn({ name: "updated_at" })
  updated_at: Date
  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date
  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[]
}
