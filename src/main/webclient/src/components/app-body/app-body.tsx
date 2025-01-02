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
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { UIProps } from "../../config/config";
import { APIClient } from "../../api/api-client";
import {
  AllDevicesUptimeJson,
  DeviceModel,
  emptyAllDevicesUptimeJson,
  IMonitoringDevice,
} from "../../types/deviceModel";
import { AboutPage } from "../about-page/about-page";
import { DashboardPage } from "../dashboard-page/dashboard-page";
import { LandingPage } from "../landing-page/landing-page";
import { MonitoringDevicePage } from "../monitoring-device-page/monitoring-device-page";
import { MonitoringPage } from "../monitoring-page/monitoring-page";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getDeniedUserInfoResponse,
  IUserInfoResponse,
} from "../../types/IUserInfoResponse";
import { UserRejectedPage } from "../user-rejected-page/user-rejected-page";
import { AdminPanelPage } from "../admin-panel-page/admin-panel-page";

const refreshTime = 3; //minutes

export const AppBody = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const apiClient = new APIClient();
  const location = useLocation();

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user?.email) {
      setEmail(user?.email);
    }
  }, [user]);

  const [accessToken, setAccessToken] = useState<string>("");

  const [userInfo, setUserInfo] = useState<IUserInfoResponse>();

  const ui = UIProps;

  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel()
  );
  const [devicesUptimeValues, setDevicesUptimeValues] =
    useState<AllDevicesUptimeJson>(emptyAllDevicesUptimeJson);

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
        element={
          <MonitoringDevicePage
            apiClient={apiClient}
            accessToken={accessToken}
            email={email}
            model={deviceModel}
          />
        }
      />,
      <Route
        key="dashboard"
        path="/dashboard"
        element={
          <DashboardPage
            model={deviceModel}
            devicesUptime={devicesUptimeValues ?? []}
          />
        }
      />,
      <Route key="about" path="/about" element={<AboutPage />} />,
      <Route key="landing-page" path="/" element={<LandingPage />} />,
      <Route
        key="user-rejected"
        path="/permission-required"
        element={<UserRejectedPage email={email} />}
      />,
      // TODO: weryfikacja, czy osoba która wchodzi ma uprawnienia
      <Route
        key="admin-panel-page"
        path="/admin"
        element={
          <AdminPanelPage
            apiClient={apiClient}
            userInfo={userInfo ?? getDeniedUserInfoResponse()}
          />
        }
      />,
      <Route key="not-found" path="*" element={<NotFoundPage />} />,
    ],
    alertsEnabled: alertsEnabled,
    setAlertsEnabled: (value: boolean) => {
      setAlertsEnabled(value);
    },
  };

  const getAccessToken = async (email?: string) => {
    try {
      const token = await getAccessTokenSilently();
      // console.log("token: " + token);
      // console.log(jwtDecode(token));
      const user = await apiClient.getUserInfo(token, email);

      setUserInfo(user);
      setAccessToken(token);
      return token;
    } catch (e: any) {
      console.error("getAccessToken error: " + e.message);
      return undefined;
    }
  };

  const updateModel = async (token: string, email: string) => {
    try {
      const data = await apiClient.getUpdatedDeviceModel(token, email);
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
      const data = await apiClient.getAllDevicesHistory("1", token, email);
      setDevicesUptimeValues(data);
      return data;
    } catch (e: any) {
      console.error("fetchUptimeValues error: " + e.message);
      setDevicesUptimeValues(emptyAllDevicesUptimeJson);
      return [];
    }
  };

  const onComponentLoaded = async () => {
    if (email || user?.email) {
      const userEmail = email ?? user?.email;
      if (!email) {
        setEmail(userEmail);
      }
      const token = await getAccessToken(userEmail);
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
    document.body.style.backgroundColor = UIProps.colors.background;
    onComponentLoaded().catch((error: any) => {
      console.error("Error happaned while recurrent updates: " + error.message);
    });
    setInterval(onComponentLoaded, 100 * 60 * refreshTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alertsEnabled, email]);

  useEffect(() => {
    if (userInfo && userInfo.userType === "EXTERNAL") {
      navigate("/application/permission-required", { replace: true });
    } else if (
      userInfo &&
      location.pathname === "/application/admin" &&
      (userInfo.userType === "EXTERNAL" || userInfo.userType === "READ_ONLY")
    ) {
      navigate("/application/permission-required", { replace: true });
    }
  }, [userInfo, navigate, location.pathname]);

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
