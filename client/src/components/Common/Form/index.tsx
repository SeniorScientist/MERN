import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  defaultValues?: { [key: string]: any };
  onSubmit: (_: any) => void;
  onInvalid?: (_: any) => void;
  schema: { [key: string]: any };
  children: any;
}

/**
 * This component is the default Form that should be used in the app.
 * It wraps the react-hook-form FormProvider and adds a validation schema as a prop.
 * Any new modifications in the UI and validation should be done here.
 */
const Form = ({
  defaultValues,
  children,
  onSubmit,
  onInvalid,
  schema,
  ...rest
}: Props) => {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Yup.object(schema).required()),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
  });

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
        {...rest}
      >
        {children}
      </Box>
    </FormProvider>
  );
};

Form.defaultProps = {
  defaultValues: {},
  onInvalid: () => {},
};

export default Form;