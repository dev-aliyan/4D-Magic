export interface Brand {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  brandId: string;
  name: string;
  price: number;
}
