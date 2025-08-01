import Ax from "@/lib/axios";
import { Product } from "@/types/product";
import { StrapiResponse } from "@/types/strapi";

export async function fetchProducts(): Promise<Product[]> {
  const res = await Ax.get<StrapiResponse<Product[]>>(
    "/api/products?populate=*"
  );
  return res.data.data;
}
export async function fetchProductByDocumentId(
  documentId: string
): Promise<Product | null> {
  const res = await Ax.get<StrapiResponse<Product[]>>(
    `/api/products?filters[documentId][$eq]=${documentId}&populate=*`
  );
  return res.data.data?.[0] || null;
}
