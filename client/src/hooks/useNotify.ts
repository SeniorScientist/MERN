import { useToast } from "@chakra-ui/react";

const useNotify = () => {
  const toast = useToast();

  const notifySuccess = (message: string) => {
    toast({
      title: message,
      status: "success",
    });
  };

  const notifyError = (message: string) => {
    toast({
      title: message,
      status: "error",
    });
  };

  const notifyWarning = (message: string) => {
    toast({
      title: message,
      status: "warning",
    });
  };

  return { notifySuccess, notifyError, notifyWarning };
};

export default useNotify;