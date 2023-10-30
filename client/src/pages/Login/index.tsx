import Form from "@/components/common/Form";
import PasswordField from "@/components/common/PasswordField";
import TextField from "@/components/common/TextField";
import { Link as RouterLink } from "react-router-dom";
import { Button, Link } from "@chakra-ui/react";
import { loginSchema } from "./login.schema";
import useLoginActions from "./useLoginActions";

const Login = () => {
  const { handleSubmit, isLoading } = useLoginActions();

  return (
    <section className="public-form">
      <h1>Welcome 🥗</h1>
      <h2>🔐 Log in to unleash your potential!</h2>

      <Form
        onSubmit={(values) => handleSubmit(values)}
        schema={loginSchema}
        width={{
          base: "100%",
          md: "80%",
          lg: "60%",
        }}
      >
        <TextField name="username" label="Username" />
        <PasswordField name="password" label="Password" />
        <Button isLoading={isLoading} type="submit" width="100%" mt="6">
          Login
        </Button>
      </Form>
      <Link
        as={RouterLink}
        to="/register"
        mt="4"
        sx={{ display: "block", textAlign: "center" }}
      >
        Don't have an account? Register
      </Link>
    </section>
  );
};

export default Login;