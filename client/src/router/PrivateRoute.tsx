import PrivateLayout from "@/layouts/PrivateLayout";
import { useAuth } from "@/store/useAuth";
import { useUser } from "@/store/useUser";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isFetching = useUser((state) => state.isFetching);


  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default PrivateRoute;