import { Box, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        bg: "gray.100",
      }}
    >
      <Spinner size="lg" mb="4" />
      <h1>Loading...</h1>
    </Box>
  );
};

export default Loader;