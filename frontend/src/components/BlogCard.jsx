import { Link } from "react-router-dom";

export default function BlogCard({ blog, onDelete }) {
  const token = localStorage.getItem("token");

  return (
    <article>
      <h2>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </h2>

      <p>{blog.content}</p>

      <p>
        Category: {blog.category?.name || blog.category_id}
      </p>

      <p>
        Author: {blog.user?.username || blog.user_id}
      </p>

      <Link to={`/blogs/${blog.id}`}>
        Read More
      </Link>

      {token && onDelete && (
        <>
          {" "}
          <button onClick={() => onDelete(blog.id)}>
            Delete
          </button>
        </>
      )}

      <hr />
    </article>
  );
}