import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/home";
import PostPage from "../pages/public/PostPage";
import Login from "../pages/auth/Login";
import DashboardAdmin from "../pages/admin/AdminDashboard";
import DashboardBlogger from "../pages/blogger/BloggerDashboard";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/blogger"
        element={
          <ProtectedRoute role="blogger">
            <DashboardBlogger />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
