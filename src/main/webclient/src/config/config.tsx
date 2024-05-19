import { theme } from "@chakra-ui/react";
import { IAppMainProps, IUIProps } from "../components/app-main/app-main";
import { Route } from "react-router-dom";
import { MonitoringPage } from "../components/monitoring-page/monitoring-page";
import { DashboardPage } from "../components/dashboard-page/dashboard-page";
import { AboutPage } from "../components/about-page/about-page";
import { LandingPage } from "../components/landing-page/landing-page";
import { NotFoundPage } from "../components/not-found-page/not-dound-page";

const UIProps: IUIProps = {
  colors: {
    white: theme.colors.white,
    black: theme.colors.black,
    primary: theme.colors.green[800],
    secondary: theme.colors.green[200],
    accent: theme.colors.gray[300],
    background: "#F4F3F0",
  },
  heigth: {
    navbar: "70px",
    footer: "0px",
  },
};

const appMainProps: IAppMainProps = {
  ui: UIProps,
  routes: [
    <Route key="monitoring" path="/monitoring" element={<MonitoringPage {...UIProps}/>} />,
    <Route key="dashboard" path="/dashboard" element={<DashboardPage />} />,
    <Route key="about" path="/about" element={<AboutPage />} />,
    <Route key="landing-page" path="/" element={<LandingPage />} />,
    <Route key="not-found" path="*" element={<NotFoundPage />} />,
  ],
};

interface IAppProps {
  appMainProps: IAppMainProps;
}

export const appProps: IAppProps = {
  appMainProps: appMainProps
}