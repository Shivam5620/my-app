"use client";

import Link from "next/link";
import { ShoppingCartIcon, CircleUser, Heart, Search } from "lucide-react";
import { useCartItems } from "@/lib/useCart";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useSearchStore } from "@/lib/store/searchStore";
import { Input } from "@/components/ui/input";

export function Header() {
  const { data: cart = [] } = useCartItems();
  const { query, setQuery } = useSearchStore();

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between px-4 sm:px-6 md:px-8 py-2 bg-white shadow gap-y-3">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight text-gray-800"
      >
        <span className="text-yellow-300">Shop</span>Easy
      </Link>

      {/* Search Box */}
      <div className="relative flex-1 w-full sm:w-auto sm:flex-1 mx-0 sm:mx-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="search"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none "
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4 sm:gap-6">
        <Heart className="cursor-pointer" />

        {/* Cart */}
        <Link href="/cart" className="relative flex items-center">
          <ShoppingCartIcon />
          <span className="sr-only">Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-1.5">
              {cart.length}
            </span>
          )}
        </Link>

        {/* User Popover */}
        <Popover>
          <PopoverTrigger className="focus:outline-none cursor-pointer">
            <CircleUser />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[280px] p-0 rounded-md">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-semibold">Welcome Shivam</p>
              <p className="text-xs text-muted-foreground">7610478479</p>
            </div>

            <div className="py-2 text-sm grid grid-cols-2 gap-x-2 px-2">
              <div className="flex flex-col">
                <p className="px-2 py-1 text-xs text-muted-foreground font-medium">
                  Orders
                </p>
                <Link href="" className="px-2 py-2 hover:bg-gray-100 rounded">
                  Wishlist
                </Link>
                <Link href="" className="px-2 py-2 hover:bg-gray-100 rounded">
                  Gift Cards
                </Link>
                <Link href="" className="px-2 py-2 hover:bg-gray-100 rounded">
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-col">
                <p className="px-2 py-1 text-xs text-muted-foreground font-medium">
                  Payment
                </p>
                <Link href="" className="px-2 py-2 hover:bg-gray-100 rounded">
                  Coupons
                </Link>
                <Link href="" className="px-2 py-2 hover:bg-gray-100 rounded">
                  Saved Cards
                </Link>
                <Link href="" className="px-2 py-2 hover:bg-gray-100 rounded">
                  Saved Addresses
                </Link>
              </div>
            </div>

            <div className="text-sm px-4 py-2 border-t">
              <p className="pt-1 pb-1 text-xs text-muted-foreground font-medium">
                Settings
              </p>
              <Link
                href=""
                className="block px-2 py-2 hover:bg-gray-100 rounded"
              >
                Edit Profile
              </Link>
              <Link
                href=""
                className="block px-2 py-2 text-yellow-300 hover:bg-gray-100 rounded"
              >
                Logout
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
}
