"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAddToCart } from "@/lib/useCart";
import { fetchProducts } from "../_api/product";
import { getSessionId } from "@/lib/session";
import ProductCard from "../component/navbar/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react"; // icon for empty state

export default function ProductPage() {
  const router = useRouter();
  const session_id = useMemo(() => getSessionId(), []);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { mutate: addToCart } = useAddToCart();

  if (isLoading) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 py-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-40 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-full rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="p-6 text-red-600">Failed to fetch products. Please try again later.</div>;
  }

  if (products.length === 0) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center space-y-4">
        <Frown className="mx-auto h-10 w-10 text-gray-500" />
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="text-gray-600">Check back later or explore other categories.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 py-2">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            session_id={session_id}
            addToCart={addToCart}
            onNavigate={() => router.push(`/product/${product.documentId}`)}
          />
        ))}
      </div>
    </div>
  );
}
