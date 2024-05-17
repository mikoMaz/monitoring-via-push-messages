import React, { useEffect } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { AppMain, IAppMainProps } from "./components/app-main/app-main";
import { Route, useNavigate } from "react-router-dom";
import { MonitoringPage } from "./components/monitoring-page/monitoring-page";
import { DashboardPage } from "./components/dashboard-page/dashboard-page";
import { AboutPage } from "./components/about-page/about-page";
import { LandingPage } from "./components/landing-page/landing-page";
import { NotFoundPage } from "./components/not-found-page/not-dound-page";

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
  routes: [
    <Route key="monitoring" path="/monitoring" element={<MonitoringPage />} />,
    <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
    <Route key="about" path="/about" element={<AboutPage />} />,
    <Route key="landing-page" path="/" element={<LandingPage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />,
  ],
};

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/monitoring", { replace: true });
    }
  });
  return <AppMain {...appMainProps} />;
}
