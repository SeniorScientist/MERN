import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppbarContainer, NavbarContent } from "./styles";

const Header = () => {
  return (
    <AppbarContainer>
      <h1>Task Management Board</h1>

      <NavbarContent>
        <Button as={Link} to="/logout">
          Logout
        </Button>
      </NavbarContent>
    </AppbarContainer>
  );
};

export default Header;