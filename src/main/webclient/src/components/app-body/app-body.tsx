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
import { jwtDecode } from "jwt-decode";

const refreshTime = 3; //minutes

export const AppBody = () => {
  const { user, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user?.email);
    }
  }, [user]);

  const [accessToken, setAccessToken] = useState<string>("");

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
        element={<MonitoringDevicePage accessToken={accessToken} email={email} model={deviceModel} />}
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

  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("token: " + token);
      console.log(jwtDecode(token));

      // await APIClient.getUserInfo(token);
      setAccessToken(token);
      return token;
    } catch (e: any) {
      console.error("getAccessToken error: " + e.message);
      return undefined;
    }
  };

  const updateModel = async (token: string, email: string) => {
    try {
      const data = await APIClient.getUpdatedDeviceModel(token, email);
      setDeviceModel(data);
      return data;
    } catch (e: any) {
      console.error("updateModel error: " + e.message);
      return new DeviceModel();
    }
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

  const fetchUptimeValues = async (token: string, email: string) => {
    try {
      const data = await APIClient.getAllDevicesHistory(
        "1",
        token,
        email
      );
      setDevicesUptimeValues(data);
      return data;
    } catch (e: any) {
      console.error("fetchUptimeValues error: " + e.message);
      setDevicesUptimeValues([]);
      return [];
    }
  };

  const onComponentLoaded = async () => {
    if (email || user?.email) {
      const userEmail = email ?? user?.email;
      if (!email) {
        setEmail(userEmail);
      }
      const token = await getAccessToken();
      if (token) {
        await updateModel(token, userEmail)
          .then((model) => checkInactiveDevices(model))
          .catch((error: any) => {
            console.error("Update model error: " + error);
          });
        await fetchUptimeValues(token, userEmail).catch((error: any) => {
          console.error(error);
        });
      }
    }
  };

  useEffect(() => {
    onComponentLoaded().catch((error: any) => {
      console.error("Error happaned while recurrent updates: " + error.message);
    });
    setInterval(onComponentLoaded, 100 * 60 * refreshTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertsEnabled, email]);

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
