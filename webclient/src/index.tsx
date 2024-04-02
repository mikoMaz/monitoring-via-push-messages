import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, MantineProvider } from "@mantine/core";
import { ChakraProvider, extendBaseTheme } from "@chakra-ui/react";

const mantineTheme = createTheme({
  /** Put your mantine theme override here */
});

const chakraTheme = extendBaseTheme({
  components: {
    //default themes for components that are using
    //ChakraBaseProvider helps to reduse initial JS payload is the size of the component themes
  },
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={mantineTheme}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MantineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
