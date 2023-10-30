import Loader from "@/components/Loader";
import { useUser } from "@/store/useUser";
import Header from "./Header";
import { Container } from "./styles";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const isInitializing = useUser((state) => state.isFetching);

  if (isInitializing) {
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