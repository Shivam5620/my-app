"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useCart } from "@/lib/useCart";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart, increment, decrement } = useCart();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:1337/api/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      console.log("Fetching product data for ID:", id);
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) return <div className="p-6">Loading product...</div>;
  if (isError || !data?.data?.attributes) return notFound();

  const product = data.data;
  const attributes = product.attributes;
  const cartItem = cart.find((item: any) => item.id === product.id);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Image
          src="/assets/images/img1.jpg"
          alt={attributes?.Title || "Product Image"}
          width={500}
          height={500}
          className="rounded-lg object-cover w-full"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{attributes?.Title}</h1>
          <p className="text-gray-700 mb-4">{attributes?.Description}</p>
          <p className="text-xl font-semibold mb-4">₹{attributes?.price}</p>

          {cartItem ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => decrement(product.id)}
                className="px-3 py-1 bg-gray-300 rounded text-xl font-bold"
              >
                -
              </button>
              <span className="text-lg">{cartItem.quantity}</span>
              <button
                onClick={() => increment(product.id)}
                className="px-3 py-1 bg-gray-300 rounded text-xl font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: attributes?.Title,
                  description: attributes?.Description,
                  price: attributes?.price,
                  image: "/assets/images/img1.jpg",
                })
              }
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
