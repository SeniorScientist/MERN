import { useMutation } from "react-query";
import { useAuth } from "@/store/useAuth";
import { useNavigate } from "react-router-dom";
import API from "@/services/API";
import useNotify from "@/hooks/useNotify";

const useLoginActions = () => {
  const { notifySuccess, notifyError } = useNotify();
  const setIsAuthenticated = useAuth((store) => store.setIsAuthenticated);
  const navigate = useNavigate();
  const { isLoading, mutate: handleSubmit } = useMutation(
    (values) => {
      return API.post("/auth/login", values);
    },
    {
      onSuccess: (response) => {
        localStorage.setItem("access_token", response.data.access_token);
        notifySuccess("Login was successfull, enjoy!");
        setIsAuthenticated(true);
        navigate("/home");
      },
      onError: () => {
        notifyError("Login failed, please try again!");
      },
    }
  );

  return {
    isLoading,
    handleSubmit,
  };
};

export default useLoginActions;