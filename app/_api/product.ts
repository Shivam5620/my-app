import Ax from "@/lib/axios";
import { IProduct } from "@/types/product";
import { IStrapiResponse } from "@/types/strapi";

export async function fetchProducts(): Promise<IProduct[]> {
  const res = await Ax.get<IStrapiResponse<IProduct[]>>(
    "/api/products?populate=*"
  );
  return res.data.data;
}
export async function fetchProductByDocumentId(
  documentId: string
): Promise<IProduct | null> {
  const res = await Ax.get<IStrapiResponse<IProduct[]>>(
    `/api/products?filters[documentId][$eq]=${documentId}&populate=*`
  );
  return res.data.data?.[0] || null;
}
