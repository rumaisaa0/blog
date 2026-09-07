import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import BlogDetails from "../pages/BlogDetails";
import Profile from "../pages/Profile";
import VerifyEmail from "../pages/VerifyEmail";
import AuthRoute from "./AuthRoute";
import ManageContributors from "../pages/ManageContributors";
import AdminReport from "../pages/AdminReport";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/blogs/:id/contributors" element={<ManageContributors />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route element={<AuthRoute />}>
        <Route path="/admin/reports" element={<AdminReport />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
