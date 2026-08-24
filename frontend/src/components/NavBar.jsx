import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {" | "}
      <Link to="/blogs">Blogs</Link>

      {user ? (
        <>
          {" | "}
          <Link to="/profile">{user.username}</Link>
          {user.role === "admin" && " (admin)"}
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
