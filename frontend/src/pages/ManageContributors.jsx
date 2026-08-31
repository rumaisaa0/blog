import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {getBlog,getUsers,addContributor,removeContributor,} from "../api";

export default function ManageContributors() {
  const { id } = useParams();

  const user = useSelector((state) => state.auth?.user ?? null);

  const [blog, setBlog] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const loadData = async () => {
    try {
        const blogResponse = await getBlog(id);
        const usersResponse = await getUsers();

        setBlog(blogResponse.data.blog);
        setUsers(usersResponse.data.users);
    } catch (err) {
        console.error("Manage contributors error:", err.response?.data || err);
        toast.error(
        err.response?.data?.error || "Unable to load contributors"
        );
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!selectedUser) {
      toast.error("Please select a user");
      return;
    }

    try {
      const response = await addContributor(
        id,
        Number(selectedUser)
      );

      toast.success(
        response.data.message || "Contributor added successfully"
      );

      setSelectedUser("");

      loadData();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Unable to add contributor"
      );
    }
  };

  const handleRemove = async (userId) => {
    if (!window.confirm("Remove this contributor?")) {
      return;
    }

    try {
      const response = await removeContributor(id, userId);

      toast.success(
        response.data.message || "Contributor removed successfully"
      );

      loadData();
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Unable to remove contributor"
      );
    }
  };

  if (!blog) {
    return <p>Loading...</p>;
  }

  const isAuthor =
    user &&
    (user.id === blog.user?.id || user.role === "admin");

  if (!isAuthor) {
    return (
      <p>
        You are not authorized to manage contributors.
      </p>
    );
  }

  const contributorIds =
    blog.contributors?.map((contributor) => contributor.id) || [];

  const availableUsers = users.filter(
    (candidate) =>
      candidate.id !== blog.user?.id &&
      !contributorIds.includes(candidate.id)
  );

  return (
    <div>
      <h1>Manage Contributors</h1>

      <h2>{blog.title}</h2>
            <div className="contributor-form">
            <label>Add Contributor</label>

            <form onSubmit={handleAdd}>
                <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)} >
                <option value="">Select user</option>

                {availableUsers.map((candidate) => (
                    <option key={candidate.id} value={candidate.id}>
                    {candidate.username}
                    </option>
                ))}
                </select>

                <button type="submit" className="add-contributor-btn">
                Add Contributor
                </button>
            </form>
            </div>

            <hr />

            <h2>Current Contributors</h2>

            {blog.contributors?.length === 0 ? (
            <p>No contributors added yet.</p>
            ) : (
            <ul className="contributors-list">
                {blog.contributors?.map((contributor) => (
                <li key={contributor.id} className="contributor-item">
                    <span>{contributor.username}</span>

                    <button
                    className="remove-contributor-btn"
                    onClick={() => handleRemove(contributor.id)}
                    >
                    Remove
                    </button>
                </li>
                ))}
            </ul>
            )}

    </div>
  );
}