type Product = {
  id: number;
  name: string;
  price: number;
};

let products: Product[] = [
  {
    id: 1,
    name: "iPhone 16",
    price: 85000,
  },
  {
    id: 2,
    name: "Samsung Galaxy S25",
    price: 72000,
  },
];

export const getAllProducts = () => products;

export const getProductById = (id: number) =>
  products.find((p) => p.id === id);

export const createProduct = (product: Product) => {
  products.push(product);
};

export const updateProduct = (
  id: number,
  updatedProduct: Partial<Product>
) => {
  const product = products.find((p) => p.id === id);

  if (!product) return null;

  Object.assign(product, updatedProduct);

  return product;
};

export const deleteProduct = (id: number) => {
  products = products.filter((p) => p.id !== id);
};