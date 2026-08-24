import { Link } from "react-router-dom";

export default function Home() {
  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Blog App</h1>

      <p>Welcome to the Blog App.</p>

      <Link to="/blogs">View Blogs</Link>

      {!token && (
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