import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login({ onSignup }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const result = login(email, password);

    if (!result.success) {
      setError(result.message);
    } else {
      setError("");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Welcome Back</h1>
        <p className="form-description">Login to your account</p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary-button">
          Login
        </button>

        <p className="form-footer">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onSignup}
          >
            Sign Up
          </button>
        </p>
      </form>
    </main>
  );
}

export default Login;