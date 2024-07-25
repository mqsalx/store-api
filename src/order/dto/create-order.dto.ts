import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsInt, ValidateNested } from 'class-validator';

class ItemOrderDTO {
  @IsInt()
  amount: number;
}

export class CreateOrderDTO {
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemOrderDTO)
  itemsOrder: ItemOrderDTO[];
}