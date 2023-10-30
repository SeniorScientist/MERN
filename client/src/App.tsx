import * as React from "react"
import { QueryClient, QueryClientProvider } from "react-query";

import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
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
