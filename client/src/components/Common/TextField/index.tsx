import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

interface Props {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  [key: string]: any;
  defaultValue?: string;
}

const TextField = ({ name, label, helperText, required, defaultValue, ...rest }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[name]?.message;

  return (
    <FormControl
      isRequired={required}
      sx={{
        "&:not(:last-child)": {
          marginBottom: "1rem",
        },
      }}
    >
      {label && <FormLabel>{label}</FormLabel>}
      <Input {...register(name)} {...rest} size="lg" defaultValue={defaultValue} />
      {errorMsg ? (
        <FormErrorMessage>{errorMsg as any}</FormErrorMessage>
      ) : helperText ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default TextField;