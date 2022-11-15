export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type ProductsApiResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type GetProductsParams = {
  skip: number;
  limit: number;
};

export function getProducts({ skip, limit }: GetProductsParams) {
  return fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
    .then((res) => res.json())
    .then((res: ProductsApiResponse) => ({
      ...res,
      // NOTE: API Error, res.skip return string instead of number
      skip: parseInt(res.skip as unknown as string),
    }));
}
