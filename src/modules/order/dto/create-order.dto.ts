import { Type } from "class-transformer"
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  ValidateNested
} from "class-validator"

class ItemOrderDTO {
  @IsUUID()
  productId: string
  @IsInt()
  amount: number
}

export class CreateOrderDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemOrderDTO)
  itemsOrder: ItemOrderDTO[]
}
