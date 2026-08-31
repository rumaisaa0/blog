import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog, getCategories } from "../api";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Unable to load categories");
      });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value,
    }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("blog[title]", form.title);
      formData.append("blog[content]", form.content);
      formData.append("blog[category_id]", Number(form.category_id));

      if (form.image) {
        formData.append("blog[image]", form.image);
        }  
      const response = await createBlog(formData);
      toast.success(response.data.message);
      navigate(`/blogs/${response.data.blog.id}`);
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to create blog");
    }
  };

  return (
    <div>
      <h1>Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Content</label>
          <textarea name="content" value={form.content} onChange={handleChange} required />
        </div>

        <div>
          <label>Category</label>
          <select name="category_id" value={form.category_id} onChange={handleChange} required>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
            <label>
                Image </label>
                <input type="file"
                    name="image" accept="image/*" onChange={handleChange} />
        </div>

        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
