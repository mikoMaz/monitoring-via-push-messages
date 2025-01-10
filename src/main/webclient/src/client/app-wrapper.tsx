import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react";
import { UIProps } from "../config/config";

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  const ui = UIProps;

  const chakraTheme = extendTheme({
    colors: {
      primary: {
        500: ui.colors.primary,
        600: theme.colors.green[900],
      },
      secondary: {
        500: ui.colors.secondary,
        600: theme.colors.green[300],
      },
      background: {
        500: ui.colors.background,
      },
      accent: {
        500: ui.colors.accent,
      },
      deviceActiveTime: {
        500: ui.colors.table.active,
      },
    },
  });

  return (
    <BrowserRouter>
      <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>
    </BrowserRouter>
  );
};
