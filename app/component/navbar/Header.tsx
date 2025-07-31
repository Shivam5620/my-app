"use client";

import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";
import { useCart } from "@/lib/useCart";

export function NavigationMenu() {
  const { cart } = useCart();

  return (
    <nav className="flex items-center justify-between px-8 py-2 bg-white shadow">
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight text-gray-800 hover:text-blue-600 transition-colors duration-200"
      >
        <span className="text-blue-600">Shop</span>Easy
      </Link>

      <Link href="/cart" className="flex items-center gap-2 relative">
        <ShoppingCartIcon />
        <span className="sr-only">Cart</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
