import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common"
import { randomUUID } from "crypto"
import { CreateProductDTO } from "./dto/CreateProduct"
import { UpdateProductDTO } from "./dto/UpdateProduct"
import { ProductEntity } from "./product.entity"
import { ProductRepository } from "./product.repository"
import { ProductService } from "./product.service"

@Controller("/products")
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService
  ) {}

  @Post()
  async create(@Body() data: CreateProductDTO) {
    const product = new ProductEntity()

    product.id = randomUUID()
    product.name = data.name
    product.userId = data.userId
    product.value = data.value
    product.availableQuantity = data.availableQuantity
    product.description = data.description
    product.category = data.category
    product.characteristics = data.characteristics
    product.image = data.image

    const productCreated = this.productService.create(product)
    return productCreated
  }

  @Get()
  async list() {
    return this.productRepository.list()
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() newData: UpdateProductDTO) {
    const productUpdated = await this.productRepository.update(id, newData)

    return {
      product: productUpdated,
      message: "Product updated successfully!"
    }
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const productDeleted = await this.productRepository.delete(id)

    return {
      product: productDeleted,
      message: "Product deleted!"
    }
  }
}
