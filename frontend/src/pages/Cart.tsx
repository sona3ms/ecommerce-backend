import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  applyCoupon,
} from "../services/api";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
};

type CartData = {
  items: CartItem[];
  subtotal: number;
};

function Cart() {
  const [cart, setCart] = useState<CartData>({
    items: [],
    subtotal: 0,
  });

  const [loading, setLoading] = useState(true);

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // =========================
  // LOAD CART
  // =========================

  const loadCart = async () => {
    try {
      const data = await getCart();

      console.log("Cart response:", data);

      setCart(data);
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // =========================
  // UPDATE QUANTITY
  // =========================

  const handleQuantityChange = async (
    productId: number,
    quantity: number
  ) => {
    if (quantity < 1) {
      return;
    }

    try {
      const data = await updateCartQuantity(
        productId,
        quantity
      );

      setCart(data.cart);
    } catch (error) {
      console.error(
        "Failed to update quantity:",
        error
      );
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================

  const handleRemove = async (productId: number) => {
    try {
      const data = await removeFromCart(productId);

      setCart(data.cart);

      // Reset coupon when cart changes
      setDiscount(0);
      setCouponApplied(false);
      setCouponMessage("");
      setCouponCode("");
    } catch (error) {
      console.error(
        "Failed to remove item:",
        error
      );
    }
  };

  // =========================
  // APPLY COUPON
  // =========================

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponMessage(
        "Please enter a coupon code."
      );

      return;
    }

    try {
      const data = await applyCoupon(
        couponCode.trim().toUpperCase()
      );

      console.log("Coupon response:", data);

      setDiscount(data.discount);
      setCouponApplied(true);

      setCouponMessage(
        "Coupon applied successfully!"
      );
    } catch (error) {
      setDiscount(0);
      setCouponApplied(false);

      setCouponMessage(
        error instanceof Error
          ? error.message
          : "Invalid coupon"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>

        <p>Loading your cart...</p>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="cart-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="cart-header">
        <div>
          <p className="section-label">
            SHOPPING BAG
          </p>

          <h1>Your Cart</h1>
        </div>

        <span className="cart-count">
          {cart.items.length}{" "}
          {cart.items.length === 1
            ? "item"
            : "items"}
        </span>
      </div>

      {/* =========================
          EMPTY CART
      ========================= */}

      {cart.items.length === 0 ? (
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your cart is empty</h2>

          <p>
            Looks like you haven't added
            anything yet.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            Start Shopping
          </Link>

        </div>
      ) : (

        /* =========================
           CART WITH ITEMS
        ========================= */

        <div className="cart-layout">

          {/* =========================
              CART ITEMS
          ========================= */}

          <section className="cart-items">

            {cart.items.map((item) => (

              <article
                className="cart-item"
                key={item.productId}
              >

                {/* Product Image */}
                <div className="cart-product-image">
                  {item.name.charAt(0)}
                </div>

                {/* Product Information */}
                <div className="cart-item-info">

                  <p className="product-category">
                    Electronics
                  </p>

                  <h2>
                    {item.name}
                  </h2>

                  <p className="cart-item-price">
                    ₹
                    {item.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                </div>

                {/* Quantity + Remove */}
                <div className="cart-item-actions">

                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          item.productId,
                          item.quantity - 1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantityChange(
                          item.productId,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    type="button"
                    className="remove-button"
                    onClick={() =>
                      handleRemove(
                        item.productId
                      )
                    }
                  >
                    Remove
                  </button>

                </div>

                {/* Item Total */}
                <div className="cart-item-total">

                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString("en-IN")}

                </div>

              </article>

            ))}

          </section>

          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <aside className="cart-summary">

            <h2>
              Order Summary
            </h2>

            {/* Coupon */}
            <div className="coupon-section">

              <label htmlFor="coupon">
                Have a coupon?
              </label>

              <div className="coupon-input-row">

                <input
                  id="coupon"
                  type="text"
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(event) =>
                    setCouponCode(
                      event.target.value
                    )
                  }
                  disabled={couponApplied}
                />

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied
                    ? "Applied"
                    : "Apply"}
                </button>

              </div>

              {couponMessage && (
                <p
                  className={
                    couponApplied
                      ? "coupon-success"
                      : "coupon-error"
                  }
                >
                  {couponMessage}
                </p>
              )}

            </div>

            {/* Subtotal */}
            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <span>
                ₹
                {cart.subtotal.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>

            {/* Discount */}
            {discount > 0 && (
              <div className="summary-row discount-row">

                <span>
                  Discount
                </span>

                <span>
                  -₹
                  {discount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>
            )}

            {/* Shipping */}
            <div className="summary-row">

              <span>
                Shipping
              </span>

              <span>
                Free
              </span>

            </div>

            <div className="summary-divider" />

            {/* Total */}
            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹
                {(
                  cart.subtotal -
                  discount
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="checkout-button"
            >
              Proceed to Checkout
            </Link>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="continue-shopping"
            >
              ← Continue Shopping
            </Link>

          </aside>

        </div>
      )}

    </main>
  );
}

export default Cart;