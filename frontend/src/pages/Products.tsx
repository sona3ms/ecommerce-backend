import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

type Product = {
  id: number;
  name: string;
  price: number;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log("Products response:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="products-page">
        <div className="products-header">
          <p className="section-label">OUR COLLECTION</p>
          <h1>Products</h1>
        </div>

        <div className="product-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="product-skeleton" key={item}>
              <div className="skeleton-image" />
              <div className="skeleton-line" />
              <div className="skeleton-small" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="products-page">
      <section className="products-header">
        <div>
          <p className="section-label">OUR COLLECTION</p>

          <h1>Find something you'll love.</h1>

          <p className="products-description">
            Explore our carefully selected collection of
            products.
          </p>
        </div>

        <span className="product-count">
          {products.length} products
        </span>
      </section>

      {products.length === 0 ? (
        <div className="empty-products">
          <h2>No products found</h2>
          <p>
            There are currently no products available.
          </p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <article
              className="product-card"
              key={product.id}
            >
              <div className="product-image">
                <div className="product-image-content">
                  <span>
                    {product.name
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>

                <span className="product-badge">
                  New
                </span>
              </div>

              <div className="product-info">
                <p className="product-category">
                  Electronics
                </p>

                <h2>{product.name}</h2>

                <div className="product-bottom">
                  <span className="product-price">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  <button
                    className="add-cart-button"
                    onClick={() =>
                      console.log(
                        "Add to cart:",
                        product.id
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Products;