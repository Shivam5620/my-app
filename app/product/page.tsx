"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useAddToCart } from "@/lib/useCart";
import { fetchProducts } from "../_api/product";
import { getSessionId } from "@/lib/session";
import ProductCard from "../component/navbar/ProductCard";

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

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-600">Failed to load products</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
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
