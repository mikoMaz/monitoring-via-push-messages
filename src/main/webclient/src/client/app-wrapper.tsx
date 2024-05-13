import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
});

const chakraTheme = extendBaseTheme({
  components: {
    //default themes for components that are using
    //ChakraBaseProvider helps to reduse initial JS payload is the size of the component themes
  },
});

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
        <MantineProvider theme={mantineTheme}>
          <ChakraProvider>{children}</ChakraProvider>
        </MantineProvider>
      </BrowserRouter>
  );
};
