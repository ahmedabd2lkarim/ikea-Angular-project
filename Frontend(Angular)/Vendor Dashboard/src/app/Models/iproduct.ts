export interface Iproduct {
  _id: string;
  name: string;
  price: {
    // currency: string;
    currentPrice: number;
    // discounted: boolean;
  };
  categoryId: string;
  vendorId: number;
  imageAlt: string;
  contextualImageUrl: string;
  image: string;
  typeName: string;
  measurement: string;
}
