import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getCart,
  getAddresses,
  checkout,
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
  discount: number;
  couponCode?: string;
};

type Address = {
  id: number;
  fullName: string;
  phone: string;
  house: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
};

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartData>({
    items: [],
    subtotal: 0,
    discount: 0,
  });

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [selectedAddress, setSelectedAddress] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [error, setError] = useState("");

  // =========================
  // LOAD CHECKOUT DATA
  // =========================

  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        const [cartData, addressData] =
          await Promise.all([
            getCart(),
            getAddresses(),
          ]);

        console.log("Checkout cart:", cartData);
        console.log(
          "Checkout addresses:",
          addressData
        );

        setCart(cartData);
        setAddresses(addressData);

        if (addressData.length > 0) {
          setSelectedAddress(
            addressData[0].id
          );
        }
      } catch (error) {
        console.error(
          "Failed to load checkout:",
          error
        );

        setError(
          "Unable to load checkout information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutData();
  }, []);

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setError(
        "Please select a delivery address."
      );

      return;
    }

    setError("");
    setPlacingOrder(true);

    try {
      const data = await checkout(
  selectedAddress,
  cart.couponCode
);

      console.log(
        "Checkout response:",
        data
      );

      alert(
        "Order placed successfully!"
      );

      navigate("/orders");
    } catch (error) {
      console.error(
        "Checkout failed:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Checkout failed"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Checkout</h1>

          <p>
            Loading checkout...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // EMPTY CART
  // =========================

  if (cart.items.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Your cart is empty</h1>

          <p>
            Add some products before
            checking out.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  // =========================
  // CALCULATE TOTAL
  // =========================

  const finalTotal =
    cart.subtotal - cart.discount;

  // =========================
  // PAGE
  // =========================

  return (
    <main className="checkout-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="checkout-header">

        <p className="section-label">
          COMPLETE YOUR PURCHASE
        </p>

        <h1>Checkout</h1>

        <p>
          Review your order and choose
          your delivery address.
        </p>

      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="checkout-error">
          {error}
        </div>
      )}

      <div className="checkout-layout">

        {/* =========================
            ADDRESS
        ========================= */}

        <section className="checkout-section">

          <div className="checkout-section-header">

            <div>
              <span className="checkout-number">
                01
              </span>

              <div>
                <h2>
                  Delivery Address
                </h2>

                <p>
                  Where should we deliver
                  your order?
                </p>
              </div>
            </div>

            <Link
              to="/addresses"
              className="checkout-add-address"
            >
              + Add Address
            </Link>

          </div>

          {addresses.length === 0 ? (

            <div className="no-address">

              <p>
                You don't have any saved
                addresses.
              </p>

              <Link
                to="/addresses"
                className="primary-button"
              >
                Add Address
              </Link>

            </div>

          ) : (

            <div className="checkout-address-list">

              {addresses.map((address) => (

                <label
                  key={address.id}
                  className={`checkout-address-card ${
                    selectedAddress ===
                    address.id
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="radio"
                    name="address"
                    checked={
                      selectedAddress ===
                      address.id
                    }
                    onChange={() =>
                      setSelectedAddress(
                        address.id
                      )
                    }
                  />

                  <div>

                    <div className="checkout-address-title">

                      <strong>
                        {address.fullName}
                      </strong>

                      {selectedAddress ===
                        address.id && (
                        <span>
                          Selected
                        </span>
                      )}

                    </div>

                    <p>
                      {address.house},{" "}
                      {address.street}
                    </p>

                    <p>
                      {address.city},{" "}
                      {address.state} -{" "}
                      {address.pincode}
                    </p>

                    <p>
                      📞 {address.phone}
                    </p>

                  </div>

                </label>

              ))}

            </div>

          )}

        </section>

        {/* =========================
            ORDER ITEMS
        ========================= */}

        <section className="checkout-section">

          <div className="checkout-section-header">

            <div>
              <span className="checkout-number">
                02
              </span>

              <div>
                <h2>
                  Your Order
                </h2>

                <p>
                  Review your items before
                  placing the order.
                </p>
              </div>
            </div>

          </div>

          <div className="checkout-items">

            {cart.items.map((item) => (

              <div
                className="checkout-item"
                key={item.productId}
              >

                <div className="checkout-item-image">
                  {item.name.charAt(0)}
                </div>

                <div className="checkout-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Quantity:{" "}
                    {item.quantity}
                  </p>

                </div>

                <strong>
                  ₹
                  {(
                    item.price *
                    item.quantity
                  ).toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

            ))}

          </div>

        </section>

        {/* =========================
            PAYMENT
        ========================= */}

        <section className="checkout-section">

          <div className="checkout-section-header">

            <div>
              <span className="checkout-number">
                03
              </span>

              <div>
                <h2>
                  Payment
                </h2>

                <p>
                  Choose your payment method.
                </p>
              </div>
            </div>

          </div>

          <div className="payment-option">

            <input
              type="radio"
              checked
              readOnly
            />

            <div>
              <strong>
                Cash on Delivery
              </strong>

              <p>
                Pay when your order
                arrives.
              </p>
            </div>

          </div>

        </section>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <aside className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          {/* SUBTOTAL */}

          <div className="checkout-summary-row">

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

          {/* COUPON / DISCOUNT */}

          {cart.discount > 0 && (
            <div className="checkout-summary-row discount-row">

              <span>
                Discount

                {cart.couponCode && (
                  <> ({cart.couponCode})</>
                )}
              </span>

              <span>
                -₹
                {cart.discount.toLocaleString(
                  "en-IN"
                )}
              </span>

            </div>
          )}

          {/* SHIPPING */}

          <div className="checkout-summary-row">

            <span>
              Shipping
            </span>

            <span>
              Free
            </span>

          </div>

          <div className="checkout-summary-divider" />

          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹
              {finalTotal.toLocaleString(
                "en-IN"
              )}
            </strong>

          </div>

          {/* PLACE ORDER */}

          <button
            type="button"
            className="checkout-place-order"
            onClick={handlePlaceOrder}
            disabled={
              placingOrder ||
              !selectedAddress
            }
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>

          {/* BACK TO CART */}

          <Link
            to="/cart"
            className="back-to-cart"
          >
            ← Back to Cart
          </Link>

        </aside>

      </div>

    </main>
  );
}

export default Checkout;