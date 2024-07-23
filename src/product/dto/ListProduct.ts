class ListProductCharacteristicsDTO {
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
  amount: number;
  description: string;
  category: string;
  characteristics: ListProductCharacteristicsDTO[];
  img: ListProductImageDTO[];
}
