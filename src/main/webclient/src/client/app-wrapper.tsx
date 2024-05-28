import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react";
import { appProps } from "../config/config";


export const AppWrapper = ({children}: {children: ReactNode}) => {
  const mantineTheme = createTheme({
    /** Put your mantine theme override here */
  });

  const chakraTheme = extendTheme({
    colors: {
      primary: {
        500: appProps.appMainProps.ui.colors.primary,
        600: theme.colors.green[900]
      },
      secondary: {
        500: appProps.appMainProps.ui.colors.secondary,
        600: theme.colors.green[300]
      },
      background: {
        500: appProps.appMainProps.ui.colors.background
      },
      accent: {
        500: appProps.appMainProps.ui.colors.accent
      }
    },
  });

  return (
    <BrowserRouter>
      <MantineProvider theme={mantineTheme}>
        <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
      </MantineProvider>
    </BrowserRouter>
  );
};
