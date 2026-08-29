import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/api";

type OrderItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
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

type Order = {
  id: number;
  items: OrderItem[];
  address: Address;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: string;
  createdAt: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await getOrders();

        console.log("Orders response:", data);

        setOrders(data);
      } catch (error) {
        console.error(
          "Failed to load orders:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-loading">
          <h1>My Orders</h1>
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">

      <div className="orders-header">
        <div>
          <p className="section-label">
            PURCHASE HISTORY
          </p>

          <h1>My Orders</h1>

          <p>
            View your recent purchases and
            order details.
          </p>
        </div>

        <Link
          to="/products"
          className="primary-button"
        >
          Continue Shopping
        </Link>
      </div>

      {error && (
        <div className="checkout-error">
          {error}
        </div>
      )}

      {!error && orders.length === 0 && (
        <div className="empty-orders">
          <div className="empty-orders-icon">
            📦
          </div>

          <h2>No orders yet</h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="primary-button"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {orders.length > 0 && (
        <div className="orders-list">

          {orders.map((order) => (
            <article
              className="order-card"
              key={order.id}
            >

              <div className="order-card-header">

                <div>
                  <p className="order-label">
                    ORDER
                  </p>

                  <h2>
                    #{order.id}
                  </h2>
                </div>

                <span className="order-status">
                  {order.status}
                </span>

              </div>

              <div className="order-items">

                {order.items.map((item) => (
                  <div
                    className="order-item"
                    key={item.productId}
                  >

                    <div className="order-item-image">
                      {item.name.charAt(0)}
                    </div>

                    <div className="order-item-info">

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

              <div className="order-card-footer">

                <div>
                  <p className="order-date">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="order-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {order.total.toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>

              </div>

            </article>
          ))}

        </div>
      )}

    </main>
  );
}

export default Orders;