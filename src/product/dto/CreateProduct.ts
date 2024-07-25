import { Type } from "class-transformer"
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested
} from "class-validator"
import { ProductEntity } from "../product.entity"

export class ProductCharacteristicDTO {
  id: string
  @IsString()
  @IsNotEmpty({ message: "Registration name cannot be empty!" })
  name: string

  @IsString()
  @IsNotEmpty({ message: "Feature description cannot be empty!" })
  description: string
  product: ProductEntity
}

export class ProductImageDTO {
  id: string
  @IsUrl({}, { message: "URL to invalid image!" })
  url: string

  @IsString()
  @IsNotEmpty({ message: "Image description cannot be empty!" })
  description: string
  product: ProductEntity
}

export class CreateProductDTO {
  @IsUUID(undefined, { message: "Invalid user ID!" })
  userId: string

  @IsString()
  @IsNotEmpty({ message: "Product name cannot be empty!" })
  name: string

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: "The value must be greater than zero!" })
  value: number

  @IsNumber()
  @Min(0, { message: "Invalid minimum quantity!" })
  availableQuantity: number

  @IsString()
  @IsNotEmpty({ message: "Product description cannot be empty!" })
  @MaxLength(1000, {
    message: "Description cannot be longer than 1000 characters!"
  })
  description: string

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicDTO)
  characteristics: ProductCharacteristicDTO[]

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  image: ProductImageDTO[]

  @IsString()
  @IsNotEmpty({ message: "Product category cannot be empty!" })
  category: string
}
