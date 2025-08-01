export interface ProductImageFormat {
  url: string;
}

export interface ProductImage {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: {
    thumbnail?: ProductImageFormat;
    small?: ProductImageFormat;
    medium?: ProductImageFormat;
    large?: ProductImageFormat;
  };
}

export interface Product {
  id: number;
  Title: string;
  Description: string;
  Price: number;
  documentId: string;
  Image?: ProductImage[];
}
