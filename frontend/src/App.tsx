import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";

import Products from "./pages/Products";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Addresses from "./pages/Addresses";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">

          <p className="hero-tag">
            WELCOME TO OUR STORE
          </p>

          <h1>
            Everything you love,
            <br />
            all in one place.
          </h1>

          <p className="hero-description">
            Discover great products at great prices.
            Simple shopping, fast checkout.
          </p>

          <a
            href="/products"
            className="primary-button"
          >
            Shop Now
          </a>

        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/addresses"
          element={<Addresses />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;