import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
        {/* {blog.category?.name || blog.category_id} */}
        {blog.category?.name }

      </td>

      <td>
        {/* {blog.user?.username || blog.user_id} */}
        {blog.user?.username }

      </td>

      <td>
        <div className="actions">
        <Link className="link-btn"  to={`/blogs/${blog.id}`} > {t("common.readMore")} </Link>

        {canManage && onDelete && (
          <button onClick={() => onDelete(blog.id)}className="red-btn"> {t("common.delete")} </button>
        )}
        </div>
      </td>
    </tr>
  );
}