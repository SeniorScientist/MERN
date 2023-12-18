import PublicLayout from "../layouts/PublicLayout";
import { useAuth } from "../store/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/task" />;
  } 

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicRoute;