import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function BlogCard({ blog, onDelete }) {
  const { user } = useAuth();

  let canManage = false;
  if (user && (user.id === blog.user_id || user.role === "admin")) {
    canManage = true;
  }

  return (
    <article>
      <h2>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      </h2>

      <p>{blog.content}</p>

      <p>Category: {blog.category?.name || blog.category_id}</p>

      <p>Author: {blog.user?.username || blog.user_id}</p>

      <Link to={`/blogs/${blog.id}`}>Read More</Link>

      {canManage && onDelete && (
        <>
          {" "}
          <button onClick={() => onDelete(blog.id)}>Delete</button>
        </>
      )}

      <hr />
    </article>
  );
}
