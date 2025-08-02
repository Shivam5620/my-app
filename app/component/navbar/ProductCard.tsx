"use client";

import Image from "next/image";
import { BASE_URL } from "@/lib/axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IProduct } from "@/types/product";
import { ICart } from "@/types/cart";
import { useEffect, useRef, useState } from "react";

interface ProductCardProps {
  product: IProduct;
  session_id: string;
  onNavigate: () => void;
  addToCart: (payload: ICart) => void;
}

export default function ProductCard({
  product,
  session_id,
  onNavigate,
  addToCart,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const images = product.Image || [];

  const startImageRotation = () => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500); // Smooth transition every 1.5s
  };

  const stopImageRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentImageIndex(0); // Reset to first image
  };

  const handleAddToCart = () => {
    addToCart({
      session_id,
      quantity: 1,
      productId: product.id,
    });
    toast.success("Product Added to cart Successfully", {
      duration: 2000,
      position: "top-right",
    });
  };

  return (
    <Card className="h-[420px] flex flex-col hover:shadow-lg hover:scale-[1.01] transition-transform duration-200">
      <div
        className="group relative w-full h-[240px] overflow-hidden rounded-t-md cursor-pointer"
        onMouseEnter={startImageRotation}
        onMouseLeave={stopImageRotation}
        onClick={onNavigate}
      >
        {/* Image Slider with fade */}
        {images.map((img, i) => {
          const imageUrl = img?.formats?.medium?.url || img?.url || "";
          return (
            <Image
              key={i}
              src={`${BASE_URL}${imageUrl}`}
              alt={img?.alternativeText || product.Title}
              fill
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-md transition-opacity duration-700 ${
                i === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          );
        })}
      </div>

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
          className="mt-auto text-xs bg-amber-300 hover:bg-amber-400 text-black cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
