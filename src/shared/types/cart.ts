export type CartItem = {
  id: number;
  productId: number;
  productTitle: string;
  productImage: string | null;
  productDescription: string | null;
  quantity: number;
  productPrice: number;
};

export type Cart = {
  id: number;
  totalAmount: number;
  items: CartItem[];
};
