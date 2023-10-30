import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";

interface Props {
  name: string;
  label?: string;
  helperText?: string;
  required?: boolean;
  [key: string]: any;
}

const PasswordField = ({
  name,
  label,
  helperText,
  required,
  ...rest
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors[name]?.message;

  const [show, setShow] = useState(false);

  return (
    <FormControl isRequired={required}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          {...register(name)}
          {...rest}
          size="lg"
        />
        <InputRightElement
          width="4.5rem"
          sx={{
            height: "100%",
            cursor: "pointer",
          }}
        >
          {show ? (
            <Icon
              boxSize={6}
              as={FaEyeSlash}
              onClick={() => setShow((s) => !s)}
              color="gray.500"
            />
          ) : (
            <Icon
              boxSize={6}
              as={FaEye}
              onClick={() => setShow((s) => !s)}
              color="gray.500"
            />
          )}
        </InputRightElement>
      </InputGroup>
      {errorMsg ? (
        <FormErrorMessage>{errorMsg as any}</FormErrorMessage>
      ) : helperText ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default PasswordField;