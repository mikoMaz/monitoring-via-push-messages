import React, { useEffect, useState } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { AppBody } from "./components/app-body/app-body";
import { Route, useNavigate } from "react-router-dom";
import { MonitoringPage } from "./components/monitoring-page/monitoring-page";
import { DashboardPage } from "./components/dashboard-page/dashboard-page";
import { AboutPage } from "./components/about-page/about-page";
import { LandingPage } from "./components/landing-page/landing-page";
import { NotFoundPage } from "./components/not-found-page/not-found-page";
import { IAppProps } from "./types/projectTypes";
import { DeviceModel } from "./types/deviceModel";
import { UIProps } from "./config/config";
import { APIClient } from "./api/api-client";
import { MonitoringDevicePage } from "./components/monitoring-device-page/monitoring-device-page";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./components/login-page/login-page";

const refreshTime = 3; //minutes

export default function App() {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel()
  );
  const [devicesUptimeValues, setDevicesUptimeValues] = useState<number[]>([]);
  const navigate = useNavigate();

  const props: IAppProps = {
    model: deviceModel,
    routes: [
      <Route
        key="monitoring"
        path="/monitoring"
        element={<MonitoringPage {...deviceModel} />}
      />,
      <Route
        key="monitoring-device"
        path="/monitoring/:device"
        element={<MonitoringDevicePage {...deviceModel} />}
      />,
      <Route
        key="dashboard"
        path="/dashboard"
        element={
          <DashboardPage
            model={deviceModel}
            devicesUptime={devicesUptimeValues}
          />
        }
      />,
      <Route key="about" path="/about" element={<AboutPage />} />,
      <Route key="landing-page" path="/" element={<LandingPage />} />,
      <Route key="not-found" path="*" element={<NotFoundPage />} />,
    ],
  };

  useEffect(() => {
    document.body.style.backgroundColor = UIProps.colors.background;
    // if (window.location.pathname === "/") {
    //   navigate(
    //     {
    //       pathname: "/monitoring",
    //       search: new URLSearchParams({ view: "allDevices" }).toString(),
    //     },
    //     { replace: true }
    //   );
    // }
    const updateModel = async () => {
      const data = await APIClient.getUpdatedDeviceModel();
      console.log(data);
      setDeviceModel(data);
    };

    const fetchUptimeValues = async () => {
      const data = await APIClient.getAllDevicesHistory("1");
      setDevicesUptimeValues(data);
    };

    updateModel();
    fetchUptimeValues();
    setInterval(updateModel, 1000 * 60 * refreshTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Athentication error occured: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return isAuthenticated && <AppBody {...props} />;
}
