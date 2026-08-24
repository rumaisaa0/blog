import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog, getCategories } from "../api";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        setError("Unable to load categories.");
      });
  }, []);

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
      const response = await createBlog({
        blog: {
          ...form,
          category_id: Number(form.category_id),
        },
      });

      navigate(`/blogs/${response.data.id}`);
    } catch (err) {
      setError(
        err.response?.data?.errors?.join(", ") ||
          "Unable to create blog."
      );
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>

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
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          Create Blog
        </button>
      </form>
    </div>
  );
}