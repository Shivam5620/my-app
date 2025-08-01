export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  title: string;
  price: number;
  image: string;
}

export interface CartStore {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}
