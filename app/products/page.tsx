"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/lib/useCart";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function ProductPage() {
  const { addToCart } = useCart();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:1337/api/products");
      const json = await res.json();
      return json.data; // no `.attributes` here
    },
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-600">Failed to load products</div>;

  return (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold mb-6">Products</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product: any) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <Card className="h-full flex flex-col transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg">
            <Image
              src={`/assets/images/img1.jpg`}
              alt={product.Name || "Shoe"}
              width={400}
              height={400}
              className="object-cover w-full h-48 rounded-t-md"
            />
            <CardContent className="flex-1 p-3">
              <CardTitle className="text-base font-semibold mb-1">
                {product.Title}
              </CardTitle>
              <p className="text-xs text-gray-500 mb-1 line-clamp-2">
                {product.Description}
              </p>
              <p className="text-sm text-gray-700 font-medium mb-2">
                ₹{product.price}
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: product.id,
                    name: product.Title,
                    description: product.Description,
                    price: product.price,
                    image: "/assets/images/img1.jpg",
                  });
                }}
                className="mt-auto w-full px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);

}
