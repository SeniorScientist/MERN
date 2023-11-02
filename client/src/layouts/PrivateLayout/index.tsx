import Loader from "@/components/Loader";
import { useUser } from "@/store/useUser";
import Header from "./Header";
import { Container } from "./styles";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const isFetching = useUser((state) => state.isFetching);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default PrivateLayout;