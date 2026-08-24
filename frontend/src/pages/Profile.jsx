import { useEffect, useState } from "react";
import { updateProfile } from "../api";
import { useAuth } from "../AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await updateProfile(form);

      setUser(response.data);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.errors?.join(", ") ||
          "Unable to update profile."
      );
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <p>Role: {user.role}</p>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
