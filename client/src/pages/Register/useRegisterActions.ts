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
        notifyError(`Error while registering. ${error.response.data.message}.`);
      },
    }
  );

  return {
    isLoading,
    handleSubmit: mutate,
  };
};

export default useRegisterActions;