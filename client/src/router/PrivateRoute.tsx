import PrivateLayout from "@/layouts/PrivateLayout";
import API from "@/services/API";
import { useAuth } from "@/store/useAuth";
import { useUser } from "@/store/useUser";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const setIsFetching = useUser((state) => state.setIsFetching);
  const setUser = useUser((state) => state.setUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isFetching = useUser((state) => state.isFetching);

  if (!isAuthenticated && !isFetching) {
    setIsFetching(true);

    API.get("/user")
      .then((response) => {
        setUser(response.data);
        setIsAuthenticated(true);
      })
      .catch((error: Error) => {
        setIsAuthenticated(false);
        return <Navigate to="/login" />;
      })
      .finally(() => {
        setIsFetching(false);
      });
    return null;
  }


  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default PrivateRoute;