"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import { BASE_URL } from "@/lib/axios";
import { fetchProductByDocumentId } from "@/app/_api/product";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useAddToCart } from "@/lib/useCart";
import { getSessionId } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import clsx from "clsx";

const AVAILABLE_SIZES = ["6", "7", "8", "9", "10", "11"];

export default function ProductDetailsPage() {
  const session_id = getSessionId();
  const { documentId } = useParams() as { documentId: string };
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", documentId],
    queryFn: () => fetchProductByDocumentId(documentId),
  });

  const { mutate: addToCart, isPending } = useAddToCart();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <div className="grid md:grid-cols-2 gap-6">
            <Skeleton className="h-[400px] w-full rounded-md" />
            <div className="flex flex-col justify-between space-y-4">
              <CardHeader className="p-0 space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardHeader>
              <CardContent className="p-0 space-y-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-10 w-full rounded" />
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isError || !product) return notFound();

  const { id, Title, Description, Price, Image: images = [] } = product;
  const img = images[0];
  const imageUrl = img?.formats?.medium?.url || img?.url || "";
  const altText = img?.alternativeText || Title;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedSize) {
      toast.warning("Please select a size");
      return;
    }

    addToCart(
      { session_id, quantity: 1, productId: id },
      {
        onSuccess: () => {
          toast.success("Product added to cart successfully", {
            duration: 2000,
            position: "top-right",
          });
        },
        onError: () => {
          toast.error("Something went wrong while adding to cart");
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Section */}
          <div className="relative w-full h-[400px] rounded-md overflow-hidden group">
            {imageUrl ? (
              <Image
                src={`${BASE_URL}${imageUrl}`}
                alt={altText}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-between">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-semibold">{Title}</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {Description}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0 mt-4 space-y-6">
              <p className="text-xl font-semibold text-green-700">₹{Price}</p>

              {/* Size Selector */}
              <div>
                <p className="text-sm font-medium mb-2">Select Size (UK)</p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={clsx(
                        "w-10 h-10 rounded-full border border-gray-300 text-sm flex items-center justify-center transition-all",
                        selectedSize === size
                          ? "bg-yellow-400 text-black border-yellow-500 font-bold"
                          : "bg-white hover:bg-yellow-100"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full cursor-pointer bg-amber-300 text-black hover:bg-yellow-400 transition"
              >
                {isPending ? "Adding..." : "Add to Cart"}
              </Button>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}
