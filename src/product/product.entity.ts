class ProductCharacteristics {
  name: string;
  description: string;
}

class ProductImage {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  value: number;
  amount: number;
  description: string;
  category: string;
  characteristics: ProductCharacteristics[];
  img: ProductImage[];
}
