import axios from "axios";

export const getStoredToken = () => {
  const storageToken = localStorage.getItem("token");
  if (storageToken) return storageToken;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));

  return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
};

export const storeToken = (token) => {
  if (!token) return;

  localStorage.setItem("token", token);

  const domain = window.location.hostname.endsWith(".localhost")
    ? ".localhost"
    : window.location.hostname;

  document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax; domain=${domain}`;
  document.cookie = `token=${encodeURIComponent(token)}; path=/; max-age=86400; SameSite=Lax`;
};

const api = axios.create({
  baseURL: `http://${window.location.hostname}:3000`,
//   headers: {
//     // "Content-Type": "application/json",
//   },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = "application/json";

  return config;
});

// Auth
export const signIn = (data) => api.post("/users/sign_in", { user: data });
export const signUp = (data) => api.post("/users", { user: data });
export const signOut = () => api.delete("/users/sign_out");

// Users
export const getProfile = () => api.get("/users/view_profile");
export const updateProfile = (data) => api.patch("/users/update_profile", { user: data });

// Blogs
export const getBlogs = (params) => api.get("/blogs", { params });
export const getBlog = (id) => api.get(`/blogs/${id}`);
export const createBlog = (formData) => api.post("/blogs", formData);
export const updateBlog = (id, data) => api.patch(`/blogs/${id}`, { blog: data });
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);
export const createEditRequest = (blogId, data) => api.post(`/blogs/${blogId}/edit_requests`, { blog: data });

// Comments
export const getComments = (blogId) => api.get(`/blogs/${blogId}/comments`);
export const createComment = (blogId, content) =>
  api.post(`/blogs/${blogId}/comments`, { comment: { content } });
export const getEditRequests = (blogId) => api.get(`/blogs/${blogId}/edit_requests`);

export const approveEditRequest = (blogId, requestId) =>
  api.patch(`/blogs/${blogId}/edit_requests/${requestId}/approve`);

export const rejectEditRequest = (blogId, requestId) =>
  api.patch(`/blogs/${blogId}/edit_requests/${requestId}/reject`);

// Categories
export const getCategories = () => api.get("/categories");
export const getAdminReport = (params = {}) => api.get("/admin/reports", { params });

// Contributors
export const getUsers = () => api.get("/users");
export const getOrganizations = () => api.get("/organizations");
export const addContributor = (blogId, userId) =>
  api.post(`/blogs/${blogId}/contributors`, { user_id: userId });
export const removeContributor = (blogId, userId) =>
  api.delete(`/blogs/${blogId}/contributors/${userId}`);

export default api;
