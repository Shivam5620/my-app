// app/_api/checkout.ts

import Ax from "@/lib/axios";
import { ICartItem } from "@/types/cart";



export async function placeOrder(cart: ICartItem[]) {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  try {
    const response = await Ax.post("/api/checkout", {
      cart,
      totalPrice: total,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to place order");
  }
}
