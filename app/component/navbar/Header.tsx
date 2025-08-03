"use client";

import Link from "next/link";
import { ShoppingCartIcon, CircleUser, Heart, Search } from "lucide-react";
import { useCartItems } from "@/lib/useCart";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export function NavigationMenu() {
  const { data: cart = [] } = useCartItems();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-2 bg-white shadow">

      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-extrabold tracking-tight text-gray-800"
      >
        <span className="text-yellow-300">Shop</span>Easy
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <Search />
        <Heart />
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
          <PopoverContent align="end" className="w-[300px] p-0 rounded-md">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-semibold">Welcome Shivam</p>
              <p className="text-xs text-muted-foreground">7610478479</p>
            </div>

            {/* Two-column grid for Links */}
            <div className="py-2 text-sm grid grid-cols-2 gap-x-2 px-2">
              {/* Left Column */}
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

              {/* Right Column */}
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

            {/* Full-width Settings section at the bottom */}
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
