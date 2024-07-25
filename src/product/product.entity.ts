import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import { ProductCharacteristicEntity } from "./product-characteristic.entity"
import { ProductImageEntity } from "./product-Image.entity"

@Entity({ name: "products" })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column({ name: "name", length: 100, nullable: false })
  name: string
  @Column({ name: "value", nullable: false })
  value: number
  @Column({ name: "available_quantity", nullable: false })
  availableQuantity: number
  @Column({ name: "description", length: 255, nullable: false })
  description: string
  @Column({ name: "category", length: 100, nullable: false })
  category: string
  @OneToMany(() => ProductCharacteristicEntity, (productCharacteristicEntity) => productCharacteristicEntity.product, { cascade: true, eager: true })
  characteristics: ProductCharacteristicEntity[]
  @OneToMany(() => ProductImageEntity, (productImageEntity) => productImageEntity.product, { cascade: true, eager: true })
  image: ProductImageEntity[]
  @CreateDateColumn({ name: "created_at" })
  created_at: Date
  @CreateDateColumn({ name: "updated_at" })
  updated_at: Date
  @DeleteDateColumn({ name: "deleted_at" })
  deleted_at: Date
}
