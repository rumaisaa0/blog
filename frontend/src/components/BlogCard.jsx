import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Eye, Trash2 } from "lucide-react";
export default function BlogCard({ blog, onDelete }) {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();
  let canManage = false;

  if (user && (user.id === blog.user_id || user.role === "admin")) {
    canManage = true;
  }

  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
      </td>

      <td>
        {blog.content}
      </td>

      <td>
        {blog.category.name}
        {/* {blog.category?.name } */}

      </td>

      <td>
        {blog.user.username}
        {/* {blog.user?.username } */}

      </td>

      <td>
        <div className="actions">
        <Link className="link-btn"  to={`/blogs/${blog.id}`} title={t("common.readMore")}   > <Eye size={18} /> </Link>

        {canManage && onDelete && (
          <button onClick={() => onDelete(blog.id)}className="red-btn" title={t("common.delete")}>  <Trash2 size={18} /> </button>
        )}
        </div>
      </td>
    </tr>
  );
}