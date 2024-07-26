import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ListProductDTO } from "./dto/ListProduct"
import { UpdateProductDTO } from "./dto/UpdateProduct"
import { ProductEntity } from "./product.entity"

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
  ) {}

  async create(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity)
  }

  async list() {
    const savedProducts = await this.productRepository.find({
      relations: {
        images: true,
        characteristics: true
      }
    })
    const listProducts = savedProducts.map(
      (product) =>
        new ListProductDTO(
          product.id,
          product.name,
          product.characteristics,
          product.images
        )
    )
    return listProducts
  }

  async update(id: string, userEntity: UpdateProductDTO) {
    const entityName = await this.productRepository.findOneBy({ id })

    // if (entityName === null) {
    if (!entityName) {
      throw new NotFoundException("Product not found!")
    }

    Object.assign(entityName, userEntity)

    await this.productRepository.save(entityName)
  }

  async delete(id: string) {
    await this.productRepository.delete(id)
  }
}
