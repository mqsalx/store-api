import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProductEntity } from "./product.entity"

@Entity({ name: "product_characteristics" })
export class ProductCharacteristicEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string
  @Column({ name: "name", length: 100, nullable: false })
  name: string
  @Column({ name: "description", length: 100, nullable: false })
  description: string
  @ManyToOne(()=> ProductEntity, product => product.characteristics)
  product: ProductEntity
}