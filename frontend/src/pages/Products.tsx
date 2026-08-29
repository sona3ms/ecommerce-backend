import { useEffect, useState } from "react";
import { addToCart, getProducts } from "../services/api";

type Product = {
  id: number;
  name: string;
  price: number;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = async (productId: number) => {
    try {
      const data = await addToCart(productId);

      console.log("Add to cart response:", data);

      alert("Product added to cart!");
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to add product to cart"
      );
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <main className="products-page">
        <h1>Products</h1>
        <p>Loading products...</p>
      </main>
    );
  }

  return (
    <main className="products-page">
      <div className="products-header">
        <p className="section-label">
          OUR COLLECTION
        </p>

        <h1>Products</h1>

        <p>
          Browse our latest products.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <article
            className="product-card"
            key={product.id}
          >
            <div className="product-image">
              {product.name.charAt(0)}
            </div>

            <div className="product-card-content">
              <p className="product-category">
                Electronics
              </p>

              <h2>{product.name}</h2>

              <div className="product-card-footer">
                <strong>
                  ₹
                  {product.price.toLocaleString(
                    "en-IN"
                  )}
                </strong>

                <button
                  type="button"
                  className="add-to-cart-button"
                  onClick={() =>
                    handleAddToCart(product.id)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Products;