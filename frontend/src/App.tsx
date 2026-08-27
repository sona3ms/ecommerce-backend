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

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">WELCOME TO OUR STORE</p>

          <h1>
            Everything you love,
            <br />
            all in one place.
          </h1>

          <p className="hero-description">
            Discover great products at great prices.
            Simple shopping, fast checkout.
          </p>

          <a href="/products" className="primary-button">
            Shop Now
          </a>
        </div>
      </section>
    </main>
  );
}

function Cart() {
  return (
    <main className="page">
      <h1>Your Cart</h1>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

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
          path="/cart"
          element={<Cart />}
        />
        <Route
  path="/profile"
  element={<Profile />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;