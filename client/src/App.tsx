import { QueryClient, QueryClientProvider } from "react-query";

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Router from "./router";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        defaultOptions: { position: "top-right", isClosable: true }
      }}
    >
      <Router />
    </ChakraProvider>
  </QueryClientProvider >
)
