"use client";

import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-yellow-100 text-black py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-left ml-16">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">ShoeStyle</h2>
          <p className="text-sm">
            Professional shoes crafted for comfort, style, and confidence.
          </p>
          <Image
            src="/assets/cart_bag.jpg"
            alt="ShoeStyle Logo"
            width={100}
            height={100}
            className="mx-auto md:mx-0 mt-4"
          />
        </div>

        {/* Navigation */}
        <div className="mt-4 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="#" className="hover:text-yellow-700">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-yellow-700">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-yellow-700">
              <Twitter size={20} />
            </a>
            <a
              href="mailto:info@shoestyle.com"
              className="hover:text-yellow-700"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="border-t border-yellow-300 mt-8 pt-4 text-center text-xs text-yellow-700">
        &copy; {new Date().getFullYear()} ShoeStyle. All rights reserved.
      </div>
    </footer>
  );
}
