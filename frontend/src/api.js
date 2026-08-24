import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auth
export const signIn = (data) =>
  api.post("/users/sign_in", { user: data });

export const signUp = (data) =>
  api.post("/users", { user: data });

export const signOut = () =>
  api.delete("/users/sign_out");

// Users
export const getProfile = () =>
  api.get("/users/view_profile");

export const updateProfile = (data) =>
  api.patch("/users/update_profile", { user: data });

// Blogs
export const getBlogs = (params) =>
  api.get("/blogs", { params });

export const getBlog = (id) =>
  api.get(`/blogs/${id}`);

export const createBlog = (data) =>
  api.post("/blogs", { blog: data });

export const updateBlog = (id, data) =>
  api.patch(`/blogs/${id}`, { blog: data });

export const deleteBlog = (id) =>
  api.delete(`/blogs/${id}`);

// Comments
export const getComments = (blogId) =>
  api.get(`/blogs/${blogId}/comments`);

export const createComment = (blogId, content) =>
  api.post(`/blogs/${blogId}/comments`, {
    comment: {
      content,
    },
  });

// Categories
export const getCategories = () =>
  api.get("/categories");

export default api;