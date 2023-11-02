import { Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AppbarContainer, NavbarContent } from "./styles";

const Header = () => {
  return (
    <AppbarContainer>
      <Text fontSize='24px' color='black'>Task Management Board</Text>

      <NavbarContent>
        <Button as={Link} to="/logout">
          Logout
        </Button>
      </NavbarContent>
    </AppbarContainer>
  );
};

export default Header;