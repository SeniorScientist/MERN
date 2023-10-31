import { useMutation } from "react-query";
import { useAuth } from "@/store/useAuth";
import { useNavigate } from "react-router-dom";
import API from "@/services/API";
import useNotify from "@/hooks/useNotify";
import { useUser } from "@/store/useUser";

const useLoginActions = () => {
  const { notifySuccess, notifyError } = useNotify();
  const setIsAuthenticated = useAuth((store) => store.setIsAuthenticated);
  const setIsFetching = useUser((state) => state.setIsFetching);
  const setUser = useUser((state) => state.setUser);
  
  const navigate = useNavigate();
  const { isLoading, mutate: handleSubmit } = useMutation(
    (values) => {
      setIsFetching(true);

      return API.post("/auth/login", values);
    },
    {
      onSuccess: (response) => {
        console.log(response)
        localStorage.setItem("access_token", response.data.access_token);
        notifySuccess("Login was successfull, enjoy!");
        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsFetching(false);
        navigate("/task");
      },
      onError: (error: any) => {
      
        if(error.response.status && error.response.status === 400) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Login failed, please try again!");
        }
       
      },
    }
  );

  return {
    isLoading,
    handleSubmit,
  };
};

export default useLoginActions;