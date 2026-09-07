import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBlog, updateBlog, createEditRequest, getCategories } from "../api";
import { useModal } from "../ModalContext";

export default function EditBlog({ blogId, onUpdated }) {
  const { closeModal } = useModal();

  const user = useSelector((state) => state.auth?.user ?? null);

  const [blog, setBlog] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function loadData() {
      try {
        const blogResponse = await getBlog(blogId);
        const categoriesResponse = await getCategories();

        const blogData = blogResponse.data.blog;

        setBlog(blogData);

        const author =
          user.id === blogData.user?.id || user.role === "admin";

        const contributor =
          blogData.contributors?.some(
            (contributor) => contributor.id === user.id
          ) ?? false;

        setIsAuthor(author);
        setIsContributor(contributor);

        if (!author && !contributor) {
          setAllowed(false);
          return;
        }

        setAllowed(true);

        setForm({
          title: blogData.title,
          content: blogData.content,
          category_id: blogData.category_id,
        });

        setCategories(categoriesResponse.data);
      } catch (err) {
        toast.error(
          err.response?.data?.error || "Unable to load blog"
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [blogId, user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        ...form,
        category_id: Number(form.category_id),
      };

      if (isAuthor) {
        const response = await updateBlog(blogId, data);

        toast.success(response.data.message);

        if (onUpdated) {
          onUpdated();
        }

        closeModal();
        return;
      }

      if (isContributor) {
        const response = await createEditRequest(blogId, data);

        toast.success(response.data.message);

        if (onUpdated) {
          onUpdated();
        }

        closeModal();
        return;
      }

      toast.error("You are not authorized to edit this blog.");
    } catch (err) {
      const errors = err.response?.data?.errors;

      toast.error(
        Array.isArray(errors)
          ? errors.join(", ")
          : err.response?.data?.error || "Unable to submit changes"
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>Please login to edit this blog.</p>;
  }

  if (!allowed) {
    return <p>You are not authorized to edit this blog.</p>;
  }

  return (
    <div>
      <h1>Edit Blog</h1>

      {isContributor && !isAuthor && (
        <p>
          You are editing this blog as a contributor. Your changes
          will be sent to the author for approval.
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required />
        </div>

        <div>
          <label>Content</label>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required/>
        </div>

        <div>
          <label>Category</label>

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange} required>
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
          {isAuthor ? "Update Blog" : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
}
