import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Signup({ onLogin }) {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    const result = signup(name, email, password);

    if (!result.success) {
      setError(result.message);
    } else {
      setError("");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p className="form-description">Create your account</p>

        {error && <p className="error-message">{error}</p>}

        <label htmlFor="signup-name">Full Name</label>
        <input
          id="signup-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="signup-email">Email</label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="signup-password">Password</label>
        <input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <button type="submit" className="primary-button">
          Sign Up
        </button>

        <p className="form-footer">
          Already have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onLogin}
          >
            Login
          </button>
        </p>
      </form>
    </main>
  );
}

export default Signup;