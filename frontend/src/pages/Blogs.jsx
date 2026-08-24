import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBlogs, deleteBlog } from "../api";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get("page") || 1;

  const fetchBlogs = async () => {
    try {
      const response = await getBlogs({
        page,
        search: searchParams.get("search") || "",
      });

      setBlogs(response.data.blogs);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, searchParams.get("search")]);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearchParams({
      page: 1,
      ...(search ? { search } : {}),
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) {
      return;
    }

    try {
      await deleteBlog(id);
      fetchBlogs();
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "You are not authorized to delete this blog."
      );
    }
  };

  return (
    <div>
      <h1>Blogs</h1>

      <form onSubmit={handleSearch}>
        <input
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      <br />

      {localStorage.getItem("token") && (
        <Link to="/blogs/new">Create Blog</Link>
      )}

      <hr />

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onDelete={handleDelete}
          />
        ))
      )}

      {pagination && (
        <Pagination pagination={pagination} />
      )}
    </div>
  );
}