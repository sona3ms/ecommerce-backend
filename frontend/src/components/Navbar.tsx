import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          Shop<span>.</span>
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>

          {user && (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/addresses">Addresses</Link>
            </>
          )}
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="welcome-user">
                Hi, {user.name || user.email}
              </span>

              <button
                className="logout-button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="login-link"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="nav-register"
              >
                Sign Up
              </Link>


            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;