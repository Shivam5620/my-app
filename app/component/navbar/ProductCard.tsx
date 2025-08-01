import Image from "next/image";
import { BASE_URL } from "@/lib/axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  session_id: string;
  isPending: boolean;
  onNavigate: () => void;
  addToCart: (payload: {
    session_id: string;
    quantity: number;
    productId: number;
  }) => void;
}

export default function ProductCard({
  product,
  session_id,
  addToCart,
  isPending,
  onNavigate,
}: ProductCardProps) {
  const img = product.Image?.[0];
  const imageUrl = img?.formats?.medium?.url || img?.url || "";

  return (
    <Card
      className="h-[420px] flex flex-col hover:shadow-lg hover:scale-[1.01] transition cursor-pointer"
      onClick={onNavigate}
    >
      <div className="group relative w-full h-[240px] rounded-md overflow-hidden">
        {imageUrl ? (
          <Image
            src={`${BASE_URL}${imageUrl}`}
            alt={img?.alternativeText || product.Title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center text-sm text-gray-500">
            No Image
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-3 flex flex-col space-y-2">
        <CardTitle className="text-base">{product.Title}</CardTitle>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.Description}
        </p>
        <p className="text-sm text-gray-700 font-medium">₹{product.Price}</p>
        <Button
          variant="default"
          size="sm"
          className="mt-auto text-xs"
          onClick={() => {
            addToCart({
              session_id,
              quantity: 1,
              productId: product.id,
            });
          }}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
