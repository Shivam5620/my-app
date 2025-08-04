"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearCart } from "@/app/_api/cart";
import Image from "next/image";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");

    const handleClearCart = async () => {
      if (!session_id) return;
      try {
        await clearCart(session_id);
        localStorage.removeItem("session_id");
        setTimeout(() => router.push("/"), 4000);
      } catch (err) {
        console.error("Failed to clear cart:", err);
      }
    };

    handleClearCart();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center space-y-4">
        {/* Success Image */}
        <div className="w-24 h-24 mx-auto">
          <Image
            src="/assets/right.jpg" 
            alt="Payment Successful"
            width={96}
            height={96}
            className="rounded-full border border-green-400 shadow-md"
          />
        </div>

        <h1 className="text-2xl font-bold text-green-700">
          Payment Successful!
        </h1>
        <p className="text-sm text-gray-600">Your order was successfully placed.</p>
        <p className="text-sm text-gray-600">Thank you for your purchase.</p>
        <p className="text-sm text-gray-500">Redirecting to home...</p>
      </div>
    </div>
  );
}
