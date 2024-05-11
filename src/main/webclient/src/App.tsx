import React from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { AppMain, IAppMainProps } from "./components/app-main/app-main";

export default function App() {
  const appMainProps: IAppMainProps = {
    ui: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        primary: "#22543D",
        secondary: "#9AE6B4",
        accent: "#CBD5E0",
        background: "#F4F3F0",
      },
    },
  };
  return <AppMain {...appMainProps} />;
}
