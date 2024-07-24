import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ListProductDTO } from "./dto/ListProduct"
import { ProductEntity } from "./product.entity"
import { UpdateProductDTO } from "./dto/UpdateProduct"

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
    const savedProducts = await this.productRepository.find()
    const listProducts = savedProducts.map((product) => {
      new ListProductDTO()
      product.id
      product.name
    })
    return listProducts
  }

  async update(id: string, userEntity: UpdateProductDTO) {
    await this.productRepository.update(id, userEntity)
  }

  async delete(id: string) {
    await this.productRepository.delete(id)
  }
}
