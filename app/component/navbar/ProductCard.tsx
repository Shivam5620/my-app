"use client";

import Image from "next/image";
import { BASE_URL } from "@/lib/axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  session_id: string;
  onNavigate: () => void;
  addToCart: (payload: {
    session_id: string;
    quantity: number;
    productId: number;
  }) => void;
}

export default function ProductCard({
  product,
  session_id,
  onNavigate,
  addToCart,
}: ProductCardProps) {
  const image = product.Image?.[0];
  const imageUrl = image?.formats?.medium?.url || image?.url || "";

  const handleAddToCart = () => {
    addToCart({
      session_id,
      quantity: 1,
      productId: product.id,
    });
    toast.success("Product added to cart");
  };

  return (
    <Card className="h-[420px] flex flex-col hover:shadow-lg hover:scale-[1.01] transition-transform duration-200">
      {/* Product Image */}
      <div
        className="group relative w-full h-[240px] overflow-hidden rounded-t-md cursor-pointer"
        onClick={onNavigate}
      >
        {imageUrl ? (
          <Image
            src={`${BASE_URL}${imageUrl}`}
            alt={image?.alternativeText || product.Title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-sm text-gray-500">
            No Image Available
          </div>
        )}
      </div>

      {/* Product Info */}
      <CardContent className="flex-1 p-4 flex flex-col gap-2">
        <CardTitle className="text-base font-semibold line-clamp-1">
          {product.Title}
        </CardTitle>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.Description}
        </p>

        <p className="text-sm font-medium text-foreground">₹{product.Price}</p>

        <Button
          variant="default"
          size="sm"
          className="mt-auto text-xs"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
