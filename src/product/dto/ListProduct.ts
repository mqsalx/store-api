class ListProductCharacteristicDTO {
  name: string;
  description: string;
}

class ListProductImageDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string;
  userId: string;
  name: string;
  value: number;
  availableQuantity: number;
  description: string;
  category: string;
  characteristics: ListProductCharacteristicDTO[];
  image: ListProductImageDTO[];
}
