import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Blog App</h1>

      <p>Welcome to the Blog App.</p>

      <Link to="/blogs">View Blogs</Link>

      {!user && (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}
