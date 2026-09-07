import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Profile from "../pages/Profile";
import VerifyEmail from "../pages/VerifyEmail";
import AuthRoute from "./AuthRoute";
import ManageContributors from "../pages/ManageContributors";
import AdminReport from "../pages/AdminReport";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/blogs/:id/contributors" element={<ManageContributors />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<AuthRoute />}>
        <Route path="/admin/reports" element={<AdminReport />} />
        <Route path="/blogs/new" element={<CreateBlog />} />
        <Route path="/blogs/:id/edit" element={<EditBlog />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
