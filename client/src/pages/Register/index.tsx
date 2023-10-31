import Form from "@/components/Common/Form";
import PasswordField from "@/components/Common/PasswordField";
import TextField from "@/components/Common/TextField";
import { Link as RouterLink } from "react-router-dom";
import { Button, Link } from "@chakra-ui/react";
import { registerSchema } from "./register.schema";
import useRegisterActions from "./useRegisterActions";

const Register = () => {
  const { isLoading, handleSubmit } = useRegisterActions();

  return (
    <section className="public-form">
      <h1>Welcome to my home assessment</h1>
      <h2>Revolutionize and join the movement!</h2>

      <Form
        onSubmit={handleSubmit}
        schema={registerSchema}
        width={{
          base: "100%",
          md: "80%",
          lg: "60%",
        }}
      >
        <TextField name="name" label="Full name" />
        <TextField name="email" label="Email" type="email" />
        <TextField name="username" label="Username" />
        <PasswordField name="password" label="Password" />
        <Button type="submit" isLoading={isLoading} width="100%" mt="6">
          Register
        </Button>
      </Form>

      <Link
        as={RouterLink}
        to="/login"
        mt="4"
        sx={{ display: "block", textAlign: "center" }}
      >
        Already have an account? Login
      </Link>
    </section>
  );
};

export default Register;