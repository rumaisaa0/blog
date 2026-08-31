import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {getEditRequests, approveEditRequest, rejectEditRequest,
} from "../api";

export default function EditRequestList({ blogId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const response = await getEditRequests(blogId);
      const allRequests = response.data.edit_requests || [];

      const blogRequests = allRequests.filter(
        (request) => request.blog_id === Number(blogId) && request.status == "pending"
      );

      setRequests(blogRequests);
    } catch (err) {
      toast.error(
        err.response?.data?.error 
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [blogId]);

  const handleApprove = async (requestId) => {
    try {
      const response = await approveEditRequest( blogId, requestId );
      toast.success(
        response.data.message || "Edit request approved successfully"
      );

      loadRequests();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Unable to approve edit request"
      );
    }
  };

  const handleReject = async (requestId) => {
    if (!window.confirm("Reject this edit request?")) {
      return;
    }

    try {
      const response = await rejectEditRequest(blogId,requestId);

      toast.success(
        response.data.message || "Edit request rejected successfully"
      );

      loadRequests();
    } catch (err) {
      toast.error(
        err.response?.data?.error || "Unable to reject edit request"
      );
    }
  };

  if (loading) {
    return <p>Loading edit requests...</p>;
  }

  if (requests.length === 0) {
    return (
      <section className="edit-requests">
        <h2>Edit Requests</h2>
        <p>No pending edit requests.</p>
      </section>
    );
  }

  return (
    <section className="edit-requests">
      <h2>Edit Requests</h2>

      {requests.map((request) => (
        <div className="edit-request-card" key={request.id}>
          <p>
            <strong>Contributor:</strong>{" "}
            {request.contributor?.username || request.contributor_id}
          </p>

          <p>
            <strong>Proposed Title:</strong> {request.title}
          </p>

          <p>
            <strong>Proposed Content:</strong>
          </p>

          <div className="proposed-content">
            {request.content}
          </div>

          <p>
            <strong>Proposed Category:</strong>{" "}
            {request.category?.name || request.category_id}
          </p>

          <p>
            <strong>Status:</strong> {request.status}
          </p>

          <div className="actions">
            <button
              type="button"
              onClick={() => handleApprove(request.id)}
            >
              Approve
            </button>

            <button
              type="button"
              className="red-btn"
              onClick={() => handleReject(request.id)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}