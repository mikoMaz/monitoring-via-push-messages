import {
  Alert,
  AlertIcon,
  AlertTitle,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";
import { IAppProps } from "../../types/projectTypes";
import { Route, Routes } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { UIProps } from "../../config/config";
import { APIClient } from "../../api/api-client";
import { DeviceModel, IMonitoringDevice } from "../../types/deviceModel";
import { AboutPage } from "../about-page/about-page";
import { DashboardPage } from "../dashboard-page/dashboard-page";
import { LandingPage } from "../landing-page/landing-page";
import { MonitoringDevicePage } from "../monitoring-device-page/monitoring-device-page";
import { MonitoringPage } from "../monitoring-page/monitoring-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { useAuth0 } from "@auth0/auth0-react";

const refreshTime = 3; //minutes

export const AppBody = () => {
  const { isAuthenticated } = useAuth0();
  const ui = UIProps;

  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel()
  );
  const [devicesUptimeValues, setDevicesUptimeValues] = useState<number[]>([]);

  const [inactiveSwitchEnabled, setInactiveSwitchEnabled] =
    useState<boolean>(false);

  const [alertsEnabled, setAlertsEnabled] = useState<boolean>(true);

  const toast = useToast();

  const props: IAppProps = {
    model: deviceModel,
    routes: [
      <Route
        key="monitoring"
        path="/monitoring"
        element={
          <MonitoringPage
            model={deviceModel}
            inactiveSwitchEnabled={inactiveSwitchEnabled}
            setInactiveSwitchEnabled={setInactiveSwitchEnabled}
          />
        }
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
    alertsEnabled: alertsEnabled,
    setAlertsEnabled: (value: boolean) => {
      setAlertsEnabled(value);
    },
  };

  const updateModel = async () => {
    const data = await APIClient.getUpdatedDeviceModel();
    setDeviceModel(data);
    return data;
  };

  const checkInactiveDevices = (model: DeviceModel) => {
    if (alertsEnabled) {
      const inactiveDevices: IMonitoringDevice[] =
        model.getInactiveDevicesArray();
      if (inactiveDevices.length && isAuthenticated) {
        toast({
          status: "error",
          title: `${inactiveDevices.length} devices are inactive!`,
          position: "top",
          isClosable: true,
          render: () => (
            <Alert
              status="error"
              variant="solid"
              onClick={() => {
                setInactiveSwitchEnabled(true);
                toast.closeAll();
              }}
            >
              <AlertIcon />
              <AlertTitle>{`${inactiveDevices.length} devices is inactive!`}</AlertTitle>
            </Alert>
          ),
        });
      }
    }
  };

  const fetchUptimeValues = async () => {
    const data = await APIClient.getAllDevicesHistory("1");
    setDevicesUptimeValues(data);
  };

  const onComponentLoaded = async () => {
    await updateModel()
      .then((model) => checkInactiveDevices(model))
      .catch((error: any) => {
        console.error(error);
      });
    await fetchUptimeValues().catch((error: any) => {
      console.error(error);
    });
  };

  useEffect(() => {
    onComponentLoaded().catch((error: any) => {});
    setInterval(onComponentLoaded, 1000 * 60 * refreshTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertsEnabled]);

  return (
    <Grid
      templateAreas={`"header header"
	"main main"
	"footer footer"`}
      gridTemplateRows={`${ui.heigth.navbar} 1fr ${ui.heigth.footer}`}
      background="background"
    >
      <GridItem area={"header"}>
        <Navbar {...props} />
      </GridItem>
      <GridItem area={"main"}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{props.routes}</Routes>
        </Suspense>
      </GridItem>
    </Grid>
  );
};
