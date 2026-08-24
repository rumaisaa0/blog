import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signUp({
        user: form,
      });

      navigate("/login");
    } catch (err) {
      const errors = err.response?.data?.errors;

      setError(
        Array.isArray(errors)
          ? errors.join(", ")
          : "Registration failed"
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}