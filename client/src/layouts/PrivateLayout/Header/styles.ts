import styled from "@emotion/styled";

export const AppbarContainer = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const NavbarContent = styled.nav`
  display: flex;
  align-items: center;

  & > * + * {
    margin-left: 1rem;
  }
`;