import { useEffect, useState } from "react";
import { getAdminReport } from "../api";
import { toast } from "react-toastify";

export default function AdminReport() {
  const [report, setReport] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReport();
    }, 300);

    return () => clearTimeout(timer);
  }, [categoryId, search]);

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response = await getAdminReport({
        ...(categoryId ? { category_id: categoryId } : {}),
        ...(search ? { search } : {}),
      });

      setReport(response.data);
      setCategories(response.data.categories);
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Unable to load admin report"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-report">
      <h1>Admin Report</h1>

      <div>
        <h2>Summary</h2>
        <table className="report-section">
            <thead>
                <tr><th>Total Blogs</th>
                <th>Total Authors</th>
                <th>Total Comments</th></tr>
            </thead>
            <tbody><tr><td><p>{report.summary.total_blogs}</p>
            </td>
            <td>
<p>{report.summary.total_authors}</p>
            </td>
            <td>
  <p>{report.summary.total_comments}</p>
            </td>
            </tr></tbody>
        </table>

      </div>

      <hr />

      <div className="report-filters">
        <h2>Filters</h2>
        <input type="text"
          placeholder="Search blogs..." value={search}
          onChange={(e) => setSearch(e.target.value)}  />

        <select value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)} >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Searching...</p>}

      <hr />

      <div className="report-section">
        <h2>Blogs</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
            </tr>
          </thead>

          <tbody>
            {report.blogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      <div className="report-section">
        <h2>Most Commented Blogs</h2>
         <table><thead>
            <tr>
                <th>Blog Title</th>
                <th>Comments</th>
            </tr>
            </thead>
            <tbody>
                  {report.most_commented.map((blog) => (
          <tr key={blog.id}>
            <td><strong>{blog.title}</strong></td>
            <td>{blog.comments_count} comments</td>
          </tr>
        ))}
                </tbody></table>
        
      </div>

      <hr />

      <div className="report-section">
        <h2>Blogs With Most Contributors</h2>
       <table><thead>
            <tr>
                <th>Blog Title</th>
                <th>Contributors</th>
            </tr>
            </thead>
            <tbody>
                  {report.most_contributors.map((blog) => (
          <tr key={blog.id}>
            <td><strong>{blog.title}</strong></td>
            <td>{blog.contributors_count} contributors</td>
          </tr>
        ))}
                </tbody></table>
   
      </div>
    </div>
  );
}