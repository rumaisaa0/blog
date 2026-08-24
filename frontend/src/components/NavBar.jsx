import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../api";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      if (token) {
        await signOut();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/blogs">Blogs</Link>

      {token ? (
        <>
          {" | "}
          <Link to="/profile">Profile</Link>
          {" | "}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}