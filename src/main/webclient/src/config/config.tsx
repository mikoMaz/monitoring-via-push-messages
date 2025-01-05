import { theme } from "@chakra-ui/react";
import { IUIProps } from "../types/projectTypes";

export const UIProps: IUIProps = {
  colors: {
    white: theme.colors.white,
    black: theme.colors.black,
    primary: theme.colors.green[800],
    secondary: theme.colors.green[200],
    accent: theme.colors.gray[300],
    background: "#F4F3F0",
    table: {
      active: theme.colors.green[100],
      disabled: theme.colors.red[100],
    },
    charts: {
      active: theme.colors.green[300],
      disabled: theme.colors.red[300],
      background: theme.colors.gray[200]
    }
  },
  height: {
    navbar: "70px",
    footer: "0px",
  },
};
