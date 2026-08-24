import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await getProfile();

      const profile = response.data.user;

      setUser(profile);

      setForm({
        username: profile.username,
        email: profile.email,
      });
    } catch (err) {
      setError("Unable to load profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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
      await updateProfile({
        user: form,
      });

      setMessage("Profile updated successfully.");

      fetchProfile();
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

      <p>
        Role: {user.role}
      </p>

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

        <button type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
}