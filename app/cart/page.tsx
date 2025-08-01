"use client";

import { BASE_URL } from "@/lib/axios";
import { useCartItems, useRemoveFromCart, useUpdateCart } from "@/lib/useCart";
import Image from "next/image";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPage() {
  const { data: cart = [], isLoading } = useCartItems();
  const { mutate: removeItem } = useRemoveFromCart();
  const { mutate: updateQuantity } = useUpdateCart();

  const handleUpdateQty = (documentId: number, newQty: number) => {
    if (newQty < 1) return;
    updateQuantity({ documentId, quantity: newQty });
  };

  const handleRemove = (documentId: number) => {
    removeItem(documentId, {
      onSuccess: () =>
        toast.success("Product removed from cart", {
          duration: 2000,
          position: "top-right",
        }),
      onError: () => toast.error("Failed to remove item. Try again."),
    });
  };

  if (isLoading)
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 border p-4 rounded-md shadow-sm bg-white"
              >
                <Skeleton className="w-20 h-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>

          <div className="space-y-4 border p-4 rounded-md shadow-md bg-white h-fit">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <Image
          src="/assets/cart_bag.jpg" // Replace with your actual empty cart image path
          alt="Empty Cart"
          width={120}
          height={120}
          className="mb-6"
        />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Hey, it feels so light!
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          There's nothing in your bag. Let's add some items.
        </p>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="px-4 py-2 text-sm font-medium bg-black text-white rounded"
        >
          Add Items from Products
        </button>
      </div>
    );

  const totalPrice = cart.reduce(
    (acc: number, item: any) => acc + item.product?.Price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product List */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item: any) => {
            const { documentId, quantity, product } = item;
            const imgUrl = product?.Image?.[0]?.url
              ? `${BASE_URL}${product.Image[0].url}`
              : "/assets/images/img1.jpg";

            return (
              <div
                key={documentId}
                className="flex items-start gap-4 border p-4 rounded-md shadow-sm bg-white"
              >
                <Image
                  src={imgUrl}
                  alt={product?.Title || "Product"}
                  width={80}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-base font-medium text-gray-800">
                    {product?.Title}
                  </h2>
                  <p className="text-sm  line-clamp-2 font-semibold text-gray-700 mb-2">
                    ₹{product?.Description}
                  </p>
                  <p className="text-sm font-extrabold text-gray-700 mb-2">
                    ₹{product?.Price}
                  </p>

                  <div className="flex items-center text-sm">
                    <button
                      onClick={() => handleUpdateQty(documentId, quantity - 1)}
                      className="px-2 py-1 border rounded-l hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQty(documentId, quantity + 1)}
                      className="px-2 py-1 border rounded-r hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(documentId)}
                    className="text-xs text-red-500 hover:underline mt-2 block"
                  >
                    Remove
                  </button>
                </div>
                <div className="text-right text-sm font-semibold">
                  ₹{product?.Price * quantity}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary */}
        <div className="border p-4 rounded-md shadow-md bg-white h-fit">
          <h2 className="text-lg font-semibold mb-4">Price Summary</h2>
          <div className="flex justify-between text-base font-medium">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="w-full mt-6 bg-black hover:bg-gray-800 text-white font-semibold py-2 rounded">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
