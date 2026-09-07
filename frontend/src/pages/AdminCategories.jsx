import { useEffect, useState } from "react";
import { getCategories, deleteCategory,} from "../api";
import { toast } from "react-toastify";
import { useModal } from "../ModalContext";
import { Pencil, Trash2 } from "lucide-react";
export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const { openModal } = useModal();

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getCategories();

      setCategories(response.data);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Unable to load categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteCategory(id);

      toast.success(
        response.data.message || "Category deleted successfully"
      );

      fetchCategories();
    } catch (err) {
      const errors = err.response?.data?.errors;

      toast.error(
        Array.isArray(errors)
          ? errors.join(", ")
          : err.response?.data?.error || "Unable to delete category"
      );
    }
  };

  const handleCreated = () => {
    fetchCategories();
  };

  const handleUpdated = () => {
    fetchCategories();
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="admin-categories">
      <div className="admin-categories-header">
        <h1>Categories</h1>

        <button className="link-btn"
          onClick={() =>
            openModal("categoryForm", { onCreated: handleCreated,onUpdated: handleUpdated, })} >
          + Add Category </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="3">No categories found.</td>
            </tr>
          ) : (
            categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>

                <td>{category.name}</td>

                <td className="actions">
                  <button className="link-btn"
                    onClick={() =>openModal("categoryForm", { category,
                        onUpdated: handleUpdated, })} > <Pencil size={18} />
                     </button>

                  <button className="red-btn"
                    onClick={() => handleDelete(category.id)} >
                     <Trash2 size={18} /></button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}