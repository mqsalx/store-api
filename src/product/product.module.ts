import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProductController } from "./product.controller"
import { ProductEntity } from "./product.entity"
import { ProductRepository } from "./product.repository"
import { ProductService } from "./product.service"

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductRepository, ProductService],
  exports: [TypeOrmModule]
})
export class ProductModule {}
