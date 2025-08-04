"use client";

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black mt-12 border-t border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <div className="flex flex-col items-start gap-3">
          <h2 className="text-2xl font-extrabold tracking-tight">ShoeStyle</h2>
          <p className="text-sm">
            Professional shoes crafted for comfort, style, and confidence.
          </p>
          <Image
            src="/assets/cart_bag.png"
            alt="ShoeStyle Logo"
            width={60}
            height={60}
            className="mt-2"
          />
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/" className="hover:underline underline-offset-4">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="hover:underline underline-offset-4"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline underline-offset-4"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline underline-offset-4"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-yellow-800 transition-colors">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-yellow-800 transition-colors">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-yellow-800 transition-colors">
              <Twitter size={20} />
            </Link>
            <Link
              href="mailto:info@shoestyle.com"
              className="hover:text-yellow-800 transition-colors"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider & Bottom Note */}
      <div className="border-t border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-xs">
          &copy; {new Date().getFullYear()} ShoeStyle. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
