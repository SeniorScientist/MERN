import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import API from "@/services/API";
import useNotify from "@/hooks/useNotify";
import { useUser } from "@/store/useUser";

export const useCreateAction = () => {
  const { notifySuccess, notifyError } = useNotify();
  const setIsFetching = useUser((state) => state.setIsFetching);

  const navigate = useNavigate();
  const { isLoading, mutate: handleSubmit } = useMutation(
    (values) => {
      setIsFetching(true);

      return API.post("/task/create", values);
    },
    {
      onSuccess: (response) => {
        notifySuccess(response.data.message);
        setIsFetching(false);
        navigate("/task");
      },
      onError: (error: any) => {
        setIsFetching(false);
        if (error.response.status && error.response.status === 400) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Task creation failed, please try again!");
        }
      },
    }
  );

  return {
    isLoading,
    handleSubmit,
  };
};


export const useUpdateAction = (id: string) => {
  const { notifySuccess, notifyError } = useNotify();
  const setIsFetching = useUser((state) => state.setIsFetching);

  const navigate = useNavigate();
  const { isLoading, mutate: handleSubmit } = useMutation(
    (values) => {
      setIsFetching(true);

      return API.put(`/task/update/${id}`, values);
    },
    {
      onSuccess: (response) => {
        notifySuccess(response.data.message);
        setIsFetching(false);
        navigate("/task");
      },
      onError: (error: any) => {
        setIsFetching(false);
        if (error.response.status && error.response.status === 400) {
          notifyError(error.response.data.message);
        } else {
          notifyError("Task update failed, please try again!");
        }

      },
    }
  );

  return {
    isLoading,
    handleSubmit,
  };
};
