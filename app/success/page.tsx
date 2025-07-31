"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold text-green-700 mb-4">
        🎉 Payment Successful!
      </h1>
      <p className="text-gray-700">
        Thank you for your order. Your payment has been processed.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Redirecting to the homepage...
      </p>
    </div>
  );
}
