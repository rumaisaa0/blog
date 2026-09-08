import { useState } from "react";
import {createCategory,updateCategory} from "../api";
import { toast } from "react-toastify";
import { useModal } from "../ModalContext";

export default function CategoryModal({ category,
  onCreated,
  onUpdated,
}) {
  const { closeModal } = useModal();

  const [name, setName] = useState(category?.name || "");
  const [loading, setLoading] = useState(false);

  const isEditing = Boolean(category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditing) {
        const response = await updateCategory(category.id, { name  });

        toast.success(
          response.data.message || "Category updated successfully" );

        onUpdated?.();
      } else {
        const response = await createCategory({   name  });

        toast.success(
          response.data.message || "Category created successfully" );

        onCreated?.();
      }

      closeModal();
    } catch (err) {
      const errors = err.response?.data?.errors;

      toast.error(
        Array.isArray(errors) ? errors.join(", ")
          : err.response?.data?.error || "Something went wrong" );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>
        {isEditing ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>

          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
           placeholder="Enter category name" required />
        </div>

        <div className="actions">
          <button type="button" onClick={closeModal} disabled={loading} >
            Cancel </button>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEditing  ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}