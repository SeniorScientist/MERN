import API from "@/services/API";
import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";

const Home = () => {
  const [response, setResponse] = useState(null);

  const handleGetMe = async () => {
    const response = await API.get("/me");

    setResponse(response.data);
  };

  console.log("authenticated outlet");

  return (
    <Box display="flex" flexDir="column">
      <Button onClick={handleGetMe}>Get /me endpoint</Button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </Box>
  );
};

export default Home;