import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { ProductEntity } from "./product.entity"

@Entity({ name: "product_images" })
export class ProductImageEntity {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  id: string
  @Column({ name: "url", length: 255, nullable: false })
  url: string
  @Column({ name: "description", length: 255, nullable: false })
  description: string
  @ManyToOne(()=> ProductEntity, product => product.characteristics)
  product: ProductEntity
}
