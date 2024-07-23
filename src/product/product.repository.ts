import { Injectable } from "@nestjs/common"
import { ProductEntity } from "./product.entity"

@Injectable()
export class ProductRepository {
  private products: ProductEntity[] = []

  list() {
    return this.products
  }

  save(product: ProductEntity) {
    this.products.push(product)
    return product
  }

  private findProductID(id: string) {
    const possibleProduct = this.products.find((product) => product.id === id)

    if (!possibleProduct) {
      throw new Error("Product not found!")
    }

    return possibleProduct
  }

  async update(id: string, newData: Partial<ProductEntity>) {
    const notUpdatable = ["id", "userId"]
    const product = this.findProductID(id)
    Object.entries(newData).forEach(([key, value]) => {
      if (notUpdatable.includes(key)) {
        return
      }
      product[key] = value
    })

    return product
  }

  async delete(id: string) {
    const product = this.findProductID(id)
    this.products = this.products.filter((product) => product.id !== id)
    return product
  }
}
