import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRoute() {
  const user = useSelector((state) => state.auth?.user ?? null);
  const loading = useSelector((state) => state.auth?.loading ?? false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
