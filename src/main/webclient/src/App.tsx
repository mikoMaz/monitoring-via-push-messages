import React, { useEffect } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { AppMain } from "./components/app-main/app-main";
import { useNavigate } from "react-router-dom";
import { appProps } from "./config/config";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor =
      appProps.appMainProps.ui.colors.background;
    if (window.location.pathname === "/") {
      navigate("/monitoring", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <AppMain {...appProps.appMainProps} />;
}
