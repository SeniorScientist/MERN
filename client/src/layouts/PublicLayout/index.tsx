import { useLocation } from "react-router-dom";
import { Container } from "./styles";
import useSectionAnimation from "./useSectionAnimation";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  useSectionAnimation();

  return <Container pathname={location.pathname}>{children}</Container>;
};

export default PublicLayout;