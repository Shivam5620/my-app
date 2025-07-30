// app/products/page.tsx
"use client";

import Image from "next/image";
import { useCart } from "@/lib/useCart";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 6999,
    image: "/assets/images/img1.jpg",
    description: "Stylish and comfortable Nike Air Max",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 8999,
    image: "/assets/images/img1.jpg",
    description: "High-performance Adidas Ultraboost",
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 4999,
    image: "/assets/images/img1.jpg",
    description: "Trendy Puma RS-X for everyday wear",
  },
  {
    id: 4,
    name: "Nike Air Max",
    price: 6999,
    image: "/assets/images/img1.jpg",
    description: "Stylish and comfortable Nike Air Max",
  },
  {
    id: 5,
    name: "Adidas Ultraboost",
    price: 8999,
    image: "/assets/images/img1.jpg",
    description: "High-performance Adidas Ultraboost",
  },
  {
    id: 6,
    name: "Puma RS-X",
    price: 4999,
    image: "/assets/images/img1.jpg",
    description: "Trendy Puma RS-X for everyday wear",
  },
  {
    id: 7,
    name: "Nike Air Max",
    price: 6999,
    image: "/assets/images/img1.jpg",
    description: "Stylish and comfortable Nike Air Max",
  },
  {
    id: 8,
    name: "Adidas Ultraboost",
    price: 8999,
    image: "/assets/images/img1.jpg",
    description: "High-performance Adidas Ultraboost",
  },
  {
    id: 9,
    name: "Puma RS-X",
    price: 4999,
    image: "/assets/images/img1.jpg",
    description: "Trendy Puma RS-X for everyday wear",
  },
  {
    id: 10,
    name: "Nike Air Max",
    price: 6999,
    image: "/assets/images/img1.jpg",
    description: "Stylish and comfortable Nike Air Max",
  },
  {
    id: 11,
    name: "Adidas Ultraboost",
    price: 8999,
    image: "/assets/images/img1.jpg",
    description: "High-performance Adidas Ultraboost",
  },
  {
    id: 12,
    name: "Puma RS-X",
    price: 4999,
    image: "/assets/images/img1.jpg",
    description: "Trendy Puma RS-X for everyday wear",
  },
];

export default function ProductPage() {
  const { addToCart } = useCart();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-700">₹{product.price}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product);
                  }}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
