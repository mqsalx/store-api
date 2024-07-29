import { PartialType } from "@nestjs/mapped-types"
import { CreateProductDTO } from "./CreateProduct"

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
