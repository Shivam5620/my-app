export interface IProductImageFormat {
  url: string;
}

export interface IProductImage {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  formats?: {
    thumbnail?: IProductImageFormat;
    small?: IProductImageFormat;
    medium?: IProductImageFormat;
    large?: IProductImageFormat;
  };
}

export interface IProduct {
  id: number;
  Title: string;
  Description: string;
  Price: number;
  documentId: string;
  Image?: IProductImage[];
}
