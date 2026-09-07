import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api";
import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import { toast } from "react-toastify";
import { useModal } from "../ModalContext";
export default function Blogs() {

  const user = useSelector((state) => state.auth.user);
  const { openModal } = useModal();
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get("page"));
  const page = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
  const fetchBlogs = async () => {
    try {
      const response = await getBlogs({
        page,
        search: searchParams.get("search") || "",
      });

      setBlogs(response.data.blogs);
      setPagination(response.data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.error )
    }
  };
 
  useEffect(() => {
    fetchBlogs();
  }, [page, searchParams.get("search")]);
    useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";

      if (search !== currentSearch) {
        setSearchParams({ page: 1,
          ...(search ? { search } : {}),
        });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) {
      return;
    }

    try {
      const response = await deleteBlog(id);
      toast.success(response?.data?.message || "Blog deleted successfully");
      fetchBlogs();
    } catch (err) {
      toast.error("You are not authorized to delete this blog");
    }
  };

  return (
    <div>
      <h1>Blogs</h1>

      <div className="search-form">
        <input type="text"
          placeholder="Search blogs..."
          value={search}   onChange={handleSearchChange}  />
      </div>

      <br />

      {user && (
        <button
          className="link-btn"
          onClick={() => openModal("createBlog", { onCreated: fetchBlogs })}
        >
          Create Blog
        </button>
      )}

      <hr />
      <table>
        <thead>
         <tr><h1>
            <th>Title</th></h1>
            <th>Content</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
         </tr>
        </thead>
        <tbody>
            {blogs.map((blog) => ( <BlogCard key={blog.id} blog={blog}  onDelete={handleDelete} />
            ))}
        </tbody>
      </table>

      {pagination && (
        <Pagination pagination={pagination} />
      )}
    </div>
  );
}
