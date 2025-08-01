"use client";

import { BASE_URL } from "@/lib/axios";
import {
  useCartItems,
  useRemoveFromCart,
  useUpdateCart,
} from "@/lib/useCart";
import Image from "next/image";

export default function CartPage() {
  const { data: cart = [], isLoading } = useCartItems();
  const { mutate: removeItem } = useRemoveFromCart();
  const { mutate: updateQuantity } = useUpdateCart();

  // ✅ Update cart quantity
  const handleUpdateQty = (documentId: number, newQty: number) => {
    if (newQty < 1) return;
    updateQuantity({ documentId, quantity: newQty });
  };

  // ✅ Remove cart item
  const handleRemove = (documentId: number) => {
    removeItem(documentId);
  };

  if (isLoading) return <div className="p-4">Loading cart...</div>;

  if (cart.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">Your cart is empty.</div>
    );

  const totalPrice = cart.reduce(
    (acc: number, item: any) => acc + item.product?.Price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item: any) => {
          const { documentId, quantity, product } = item;
          const imgUrl = product?.Image?.[0]?.url
            ? `${BASE_URL}${product.Image[0].url}`
            : "/assets/images/img1.jpg";

          return (
            <div
              key={documentId}
              className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
            >
              <Image
                src={imgUrl}
                alt={product?.Title || "Product"}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-medium">{product?.Title}</h2>
                <p className="text-gray-600">{product?.Description}</p>
                <p className="text-gray-700 font-semibold">₹{product?.Price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleUpdateQty(documentId, quantity - 1)}
                    className="px-2 py-1 border rounded-l hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-t border-b">{quantity}</span>
                  <button
                    onClick={() => handleUpdateQty(documentId, quantity + 1)}
                    className="px-2 py-1 border rounded-r hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  ₹{product?.Price * quantity}
                </p>
                <button
                  onClick={() => handleRemove(documentId)}
                  className="text-sm text-red-500 hover:underline mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t pt-4 text-right">
        <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
        <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Checkout
        </button>
      </div>
    </div>
  );
}
