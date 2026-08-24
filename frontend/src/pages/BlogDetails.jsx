import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {getBlog,deleteBlog,getComments,createComment} from "../api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const blogResponse = await getBlog(id);
      const commentsResponse = await getComments(id);

      setBlog(blogResponse.data);
      setComments(commentsResponse.data);
    } catch (err) {
      setError("Unable to load blog.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleComment = async (content) => {
    try {
      await createComment(id, {
        comment: {
          content,
        },
      });

      fetchData();
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

  return (
    <div>
      <h1>{blog.title}</h1>

      <p>{blog.content}</p>

      <p>
        Category: {blog.category?.name}
      </p>

      <p>
        Author: {blog.user?.username}
      </p>

      {localStorage.getItem("token") && (
        <>
          <Link to={`/blogs/${id}/edit`}>
            Edit
          </Link>

          {" "}

          <button onClick={handleDelete}>
            Delete
          </button>
        </>
      )}

      <hr />

      <h2>Comments</h2>

      <CommentList comments={comments} />

      {localStorage.getItem("token") && (
        <CommentForm onSubmit={handleComment} />
      )}
    </div>
  );
}