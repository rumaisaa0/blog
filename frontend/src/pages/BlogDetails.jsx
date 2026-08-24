import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBlog, deleteBlog, createComment } from "../api";
import { useAuth } from "../AuthContext";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  async function fetchBlog() {
    try {
      const response = await getBlog(id);
      setBlog(response.data);
    } catch (err) {
      setError("Unable to load blog.");
    }
  }

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleComment = async (content) => {
    try {
      await createComment(id, content);
      fetchBlog();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Unable to create comment."
      );
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) {
      return;
    }

    try {
      await deleteBlog(id);
      navigate("/blogs");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "You are not authorized to delete this blog."
      );
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!blog) {
    return <p>Loading...</p>;
  }

  let canManage = false;
  if (user && (user.id === blog.user.id || user.role === "admin")) {
    canManage = true;
  }

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>{blog.content}</p>

      <p>Category: {blog.category?.name}</p>

      <p>Author: {blog.user?.username}</p>

      {canManage && (
        <>
          <Link to={`/blogs/${id}/edit`}>Edit</Link>{" "}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      <hr />

      <h2>Comments</h2>

      <CommentList comments={blog.comments} />

      {user && <CommentForm onSubmit={handleComment} />}
    </div>
  );
}
