import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Profile from "../pages/Profile";
import AuthRoute from "./AuthRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />

      <Route element={<AuthRoute />}>
        <Route path="/blogs/new" element={<CreateBlog />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
