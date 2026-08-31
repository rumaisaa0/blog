import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getBlog, deleteBlog, createComment } from "../api";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import EditRequestList from "../components/EditRequestList";
import ContributorList from "../components/ContributorList";
import { useTranslation } from "react-i18next";
export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user ?? null);
  const { t } = useTranslation();
  const [blog, setBlog] = useState(null);

  async function fetchBlog() {
    try {
      const response = await getBlog(id);
      setBlog(response.data.blog);
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to load blog");
    }
  }

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const handleComment = async (content) => {
    try {
      const response = await createComment(id, content);
      toast.success(response.data.message);
      fetchBlog();
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to create comment.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this blog?")) {
      return;
    }

    try {
      const response = await deleteBlog(id);
      toast.success(response.data.message);
      navigate("/blogs");
    } catch (err) {
      toast.error(err.response?.data?.error || "Unable to delete blog.");
    }
  };
  const add_contr = async()=>{
        
  };
  if (!blog) {
    return <p>Loading...</p>;
  }

  let canManage = false;
  if (user && (user.id === blog.user.id || user.role === "admin")) {
    canManage = true;
  }


  const isContributor =
  user &&
  blog.contributors?.some(
    (contributor) => contributor.id === user.id
  );

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      {blog.image_url && ( <img src={blog.image_url} alt={blog.title} className="blog_pic" /> )}
      <p>{blog.content}</p>
      <p>{t("blogs.category")}: {blog.category?.name}</p>
      <p>{t("blogs.author")}: {blog.user?.username}</p>

      {canManage && (
        <div>
        <div className="actions">
          <Link className="link-btn" to={`/blogs/${id}/edit`}>
            {t("common.edit")}
          </Link>{" "}
          <button onClick={handleDelete} className="red-btn">
            {t("common.delete")}
          </button>
          
        </div>
        <EditRequestList blogId={id} />
        <div>
            <h2>Contributors</h2>
            <ContributorList contr={blog.contributors}/>
             <Link className="link-btn"
          to={`/blogs/${id}/contributors`}> Manage Contributors </Link>
            </div>
            </div>
      )}
      {isContributor && (
        <div className="actions">
          <Link className="link-btn" to={`/blogs/${id}/edit`}>
            {"suggest edit"}
          </Link>{" "}
          
        </div>
    
      )}

      <hr />

      <h2>{t("comments.comments")}</h2>
      <CommentList comments={blog.comments} />
      {user && <CommentForm onSubmit={handleComment} />}
    </div>
  );
}
