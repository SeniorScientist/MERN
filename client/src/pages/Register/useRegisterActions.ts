import { useMutation } from "react-query";
import useNotify from "@/hooks/useNotify";
import API from "@/services/API";
import { useNavigate } from "react-router-dom";

const useRegisterActions = () => {
  const navigate = useNavigate();
  const { notifyError, notifySuccess } = useNotify();

  const { isLoading, mutate } = useMutation(
    (values) => API.post("/user/register", values),
    {
      onSuccess: () => {
        notifySuccess("Registered successfully!");
        navigate("/login");
      },
      onError: (error: any) => {
        if (error.response.status && error.response.status === 400) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Login failed, please try again!");
        }
      },
    }
  );

  return {
    isLoading,
    handleSubmit: mutate,
  };
};

export default useRegisterActions;