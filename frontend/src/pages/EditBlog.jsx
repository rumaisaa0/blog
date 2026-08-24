import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBlog, updateBlog, getCategories } from "../api";
import { useAuth } from "../AuthContext";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadData() {
      try {
        const blogResponse = await getBlog(id);
        const categoriesResponse = await getCategories();

        const blog = blogResponse.data;

        if (blog.user.id !== user.id && user.role !== "admin") {
          setAllowed(false);
          return;
        }

        setForm({
          title: blog.title,
          content: blog.content,
          category_id: blog.category_id,
        });

        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Unable to load blog."
        );
      }
    }

    loadData();
  }, [id, user]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await updateBlog(id, {
        ...form,
        category_id: Number(form.category_id),
      });

      navigate(`/blogs/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "You are not authorized to update this blog."
      );
    }
  };

  if (!allowed) {
    return <p>You can only edit your own blogs.</p>;
  }

  return (
    <div>
      <h1>Edit Blog</h1>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Category</label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
}
