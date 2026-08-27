import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const data = await registerUser(
        name,
        email,
        password
      );

      console.log(
        "Registration successful:",
        data
      );

      alert("Registration successful!");
    } catch (error) {
      console.error(
        "Registration failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Registration failed"
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card register-card">

        <div className="auth-header">
          <div className="auth-logo">
            Shop<span>.</span>
          </div>

          <h1>Create your account</h1>

          <p>
            Join us and start shopping today.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >
          <div className="form-group">
            <label htmlFor="name">
              Full name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email">
              Email address
            </label>

            <input
              id="register-email"
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
            <label htmlFor="register-password">
              Password
            </label>

            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
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
            Create account
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Sign in
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}

export default Register;