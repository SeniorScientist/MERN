import PublicLayout from "@/layouts/PublicLayout";
import { useAuth } from "@/store/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const hasAccessToken = localStorage.getItem("access_token");

  if (isAuthenticated || hasAccessToken) {
    return <Navigate to="/home" />;
  }

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicRoute;