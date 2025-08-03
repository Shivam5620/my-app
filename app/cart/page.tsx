"use client";

import { BASE_URL } from "@/lib/axios";
import { useCartItems, useRemoveFromCart, useUpdateCart } from "@/lib/useCart";
import Image from "next/image";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
        toast.success("Product Removed from cart successfully", {
          duration: 2000,
          position: "top-right",
        }),
      onError: () => toast.error("Failed to remove item. Try again."),
    });
  };

  const totalPrice = cart.reduce(
    (acc: number, item: any) => acc + item.product?.Price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const payload = cart.map((item: any) => ({
        name: item.product?.Title || "Unnamed Product",
        price: Number(item.product?.Price || 0),
        quantity: Number(item.quantity || 1),
      }));

      const total = payload.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
      );

      const res = await fetch(`${BASE_URL}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: payload, totalPrice: total }),
      });

      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to redirect to payment");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Something went wrong while placing order");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <Skeleton className="h-8 w-1/3 mb-4" />
        {[1, 2].map((i) => (
          <Card key={i} className="flex gap-4 p-4">
            <Skeleton className="w-20 h-24 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <Image
          src="/assets/cart_bag.jpg"
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
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-amber-300 text-black hover:bg-amber-400"
        >
          Add Items from Products
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item: any) => {
            const { documentId, quantity, product } = item;
            const imgUrl = product?.Image?.[0]?.url
              ? `${BASE_URL}${product.Image[0].url}`
              : "/assets/images/img1.jpg";

            return (
              <Card key={documentId} className="flex gap-4 p-4">
                <Image
                  src={imgUrl}
                  alt={product?.Title || "Product"}
                  width={80}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-base font-semibold">
                      {product?.Title}
                    </CardTitle>
                  </CardHeader>
                  <p className="text-sm text-muted-foreground mb-1">
                    ₹{product?.Description}
                  </p>
                  <p className="text-sm font-semibold mb-2">
                    ₹{product?.Price}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQty(documentId, quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="px-3">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateQty(documentId, quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-red-600 px-0 mt-2"
                    onClick={() => handleRemove(documentId)}
                  >
                    Remove
                  </Button>
                </div>
                <div className="text-sm font-semibold text-right whitespace-nowrap">
                  ₹{product?.Price * quantity}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right - Price Summary */}
        <Card className="h-fit p-4 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-bold">Price Summary</CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-4">
            {/* Individual Product Rows */}
            {cart.map((item: any) => (
              <div
                key={item.documentId}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{item.product?.Title}</span>
                  <span className="text-muted-foreground">
                    {item.quantity} × ₹{item.product?.Price}
                  </span>
                </div>
                <div className="font-semibold">
                  ₹{item.quantity * item.product?.Price}
                </div>
              </div>
            ))}

            <Separator />

            {/* Total */}
            <div className="flex justify-between text-base font-medium">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <Button
              className="w-full mt-4 ml-auto bg-amber-300 text-black hover:bg-yellow-400 transition-colors duration-200"
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
