export interface ICart {
  session_id: string;
  quantity: number;
  productId: number;
}
export interface ICartItem {
  name: string;
  price: number;
  quantity: number;
}