"use client";

import Image from "next/image";
import { BASE_URL } from "@/lib/axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IProduct } from "@/types/product";
import { ICart } from "@/types/cart";
import { useRef, useState } from "react";
import { Heart } from "lucide-react";

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
    }, 1500);
  };

  const stopImageRotation = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentImageIndex(0);
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
    <Card className="h-[360px] max-w-sm w-full flex flex-col hover:shadow-lg hover:scale-[1.01] transition-transform duration-200">
      <div
        className="group relative w-full h-[240px] overflow-hidden rounded-t-md cursor-pointer"
        onMouseEnter={startImageRotation}
        onMouseLeave={stopImageRotation}
        onClick={onNavigate}
      >
        {images.map((img, i) => {
          const imageUrl = img?.formats?.medium?.url || img?.url || "";
          return (
            <Image
              key={i}
              src={`${BASE_URL}${imageUrl}`}
              alt={img?.alternativeText || product.Title}
              fill
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-t-md transition-all duration-700 ease-in-out transform 
          ${
            i === currentImageIndex
              ? "opacity-100 z-10 group-hover:scale-105 group-hover:brightness-90"
              : "opacity-0 z-0"
          }`}
            />
          );
        })}
      </div>

      <CardContent className="flex-1 p-4 flex flex-col gap-1">
        <CardTitle className="text-sm font-semibold line-clamp-1">
          {product.Title}
        </CardTitle>

        <p className="text-xs line-clamp-2">{product.Description}</p>

        <p className="text-sm font-medium text-foreground">₹{product.Price}</p>

        <div className="mt-auto flex items-center justify-between gap-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1 text-xs cursor-pointer bg-white hover:bg-amber-400 text-black border border-gray-300 hover:border-black transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-300 hover:bg-gray-100"
          >
            <Heart className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
