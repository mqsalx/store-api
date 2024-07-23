import { Type } from "class-transformer"
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested
} from "class-validator"
import { ProductCharacteristicsDTO, ProductImageDTO } from "./CreateProduct"

export class UpdateProductDTO {
  @IsUUID(undefined, { message: "Invalid product ID!" })
  id: string

  @IsUUID(undefined, { message: "Invalid user ID!" })
  userID: string

  @IsString()
  @IsNotEmpty({ message: "Product name cannot be empty!" })
  @IsOptional()
  name: string

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: "The value must be greater than zero!" })
  @IsOptional()
  value: number

  @IsNumber()
  @Min(0, { message: "Invalid minimum quantity!" })
  @IsOptional()
  availableQuantity: number

  @IsString()
  @IsOptional()
  description: string

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicsDTO)
  @IsOptional()
  characteristics: ProductCharacteristicsDTO[]

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  img: ProductImageDTO[]

  @IsString()
  @IsNotEmpty({ message: "Product category cannot be empty!" })
  @IsOptional()
  category: string
}
