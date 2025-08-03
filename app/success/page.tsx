"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clearCart } from "@/app/_api/cart";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const session_id = localStorage.getItem("session_id");

    const handleClearCart = async () => {
      if (!session_id) return;
      try {
        await clearCart(session_id);
        console.log("Cart cleared successfully");
        localStorage.removeItem("session_id");
        setTimeout(() => router.push("/"), 4000);
      } catch (err) {
        console.error("Failed to clear cart:", err);
      }
    };

    handleClearCart();
  }, [router]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">🎉 Payment Successful</h1>
      <p>Your cart has been cleared.</p>
      <p>Redirecting to home...</p>
    </div>
  );
}
