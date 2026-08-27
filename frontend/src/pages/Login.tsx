import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const data = await loginUser(
        email,
        password
      );

      console.log("Login response:", data);

      login(data.user, data.token);

      alert("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="auth-logo">
            Shop<span>.</span>
          </div>

          <h1>Welcome back</h1>

          <p>
            Sign in to continue shopping with us.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleLogin}
        >
          <div className="form-group">
            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Sign in
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Create one
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default Login;