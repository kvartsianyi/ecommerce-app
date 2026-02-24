export type CartItem = {
  id: number;
  productId: number;
  title: string;
  price: number;
  picture: string;
  quantity: number;
};

export type Cart = {
  id: number;
  totalAmount: number;
  items: CartItem[];
};
