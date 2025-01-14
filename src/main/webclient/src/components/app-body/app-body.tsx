import { Grid, GridItem, useToast } from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";
import { IAppProps } from "../../types/projectTypes";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
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
import { getToastOptions } from "../layout/inactive-devices-alert-toast";
import { LocalStorageManager } from "../../types/localStorageMenager";
import { AdminPanelPage } from "../admin-panel-page/admin-panel-page";
import { LoadingPage } from "../loading-page/loading-page";
import { usingTestData } from "../../util/useTestData";
import { diplayAccessToken } from "../../util/displayAccessToken";
import { ICompanyDto } from "../../types/ICompanyDto";

const refreshTime = 3; //minutes

export const AppBody = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const apiClient = new APIClient();
  const location = useLocation();

  const [email, setEmail] = useState<string>(getDeniedUserInfoResponse().email);

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

  const [defaultCompany, setDefaultCompany] = useState<
    ICompanyDto | undefined
  >();

  const defaultCompanyRef = useRef<ICompanyDto | undefined>(defaultCompany);

  useEffect(() => {
    defaultCompanyRef.current = defaultCompany;
  }, [defaultCompany])

  const [inactiveSwitchEnabled, setInactiveSwitchEnabled] =
    useState<boolean>(false);

  const [deviceAlertsEnabled, setDeviceAlertsEnabled] = useState<boolean>(
    LocalStorageManager.getDeviceAlertsEnabledValue()
  );

  const [companies, setCompanies] = useState<ICompanyDto[]>([]);

  const refreshCompaniesList = async () => {
    await apiClient
      .getAllCompanies(accessToken)
      .then((companiesList) => {
        setCompanies(companiesList);
      })
      .catch((error) => {
        console.error("Companies fetching failed " + error.message);
        setCompanies([]);
      });
  };

  const alertsEnabledRef = useRef<boolean>(false);

  useEffect(() => {
    if (deviceAlertsEnabled !== alertsEnabledRef.current) {
      alertsEnabledRef.current = deviceAlertsEnabled;
    }
  }, [deviceAlertsEnabled]);

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
            model={deviceModel}
            companyId={defaultCompany}
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
        element={
          <UserRejectedPage
            userInfo={userInfo ?? getDeniedUserInfoResponse(email)}
          />
        }
      />,
      <Route
        key="admin-panel-page"
        path="/admin"
        element={
          <AdminPanelPage
            apiClient={apiClient}
            userInfo={userInfo ?? getDeniedUserInfoResponse()}
            accessToken={accessToken}
            companies={companies}
            refreshCompaniesList={refreshCompaniesList}
          />
        }
      />,
      <Route key="not-found" path="*" element={<NotFoundPage />} />,
    ],
    alertsEnabled: deviceAlertsEnabled,
    setAlertsEnabled: (value: boolean) => {
      setDeviceAlertsEnabled(value);
      LocalStorageManager.saveDeviceAlertsEnabled(value);
    },
  };

  const getAccessToken = async (email?: string) => {
    if (usingTestData()) {
      const user = await apiClient.getUserInfo("accessToken", email);
      setUserInfo(user);
      setAccessToken("token");
      setEmail(user.email);
      return "token";
    } else {
      try {
        const token = await getAccessTokenSilently();
        diplayAccessToken(token);
        const user = await apiClient.getUserInfo(token, email);

        setUserInfo(user);
        setAccessToken(token);
        setEmail(user.email);
        return token;
      } catch (e: any) {
        console.error("getAccessToken error: " + e.message);
        return undefined;
      }
    }
  };

  const getReadCompanies = async (token: string): Promise<ICompanyDto[]> => {
    return await apiClient
      .getAllCompanies(token)
      .then((coms) => {
        setCompanies(coms);
        return coms;
      })
      .catch((error) => {
        console.error("Getting companis list failed: " + error.message);
        return [];
      });
  };

  const getDefaultCompany = async (
    companies: ICompanyDto[]
  ): Promise<ICompanyDto | undefined> => {
    try {
      const firtsCompany = defaultCompanyRef.current
        ? defaultCompanyRef.current
        : companies[0]
        ? companies[0]
        : undefined;
      if (!firtsCompany) {
        throw new Error("User doesn't have acces to companies");
      }
      return firtsCompany;
    } catch (e: any) {
      console.error("Getting company information failed: " + e.message);
      return undefined;
    }
  };

  const updateModel = async (token: string, companyId: number) => {
    try {
      const data = await apiClient.getUpdatedDeviceModel(
        token,
        companyId.toString()
      );
      setDeviceModel(data);
      return data;
    } catch (e: any) {
      console.error("updateModel error: " + e.message);
      return new DeviceModel();
    }
  };

  const checkInactiveDevices = (model: DeviceModel) => {
    if (alertsEnabledRef.current) {
      const inactiveDevices: IMonitoringDevice[] =
        model.getInactiveDevicesArray();
      if (inactiveDevices.length && isAuthenticated) {
        toast(
          getToastOptions(inactiveDevices.length, () => {
            setInactiveSwitchEnabled(true);
            toast.closeAll();
          })
        );
      }
    }
  };

  const fetchUptimeValues = async (
    token: string,
    companyId: number
  ): Promise<AllDevicesUptimeJson> => {
    try {
      const data = await apiClient.getAllDevicesHistory(
        companyId.toString(),
        token
      );
      setDevicesUptimeValues(data);
      return data;
    } catch (e: any) {
      console.error("fetchUptimeValues error: " + e.message);
      setDevicesUptimeValues(emptyAllDevicesUptimeJson);
      return emptyAllDevicesUptimeJson;
    }
  };

  const onComponentLoaded = async () => {
    const token = await getAccessToken();
    if (token) {
      const companiesList = await getReadCompanies(token);
      const company = await getDefaultCompany(companiesList);
      if (company) {
        setDefaultCompany(company);
        await updateModel(token, company.companyId)
          .then((model) => {
            checkInactiveDevices(model);
          })
          .catch((error: any) => {
            console.error("Update model error: " + error);
          });
        await fetchUptimeValues(token, company.companyId).catch(
          (error: any) => {
            console.error(error);
          }
        );
      }
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = UIProps.colors.background;
    onComponentLoaded().catch((error: any) => {
      console.error("Error happaned while recurrent updates: " + error.message);
    });
    setInterval(onComponentLoaded, 1000 * 60 * refreshTime);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCompany]);

  useEffect(() => {
    if (userInfo && userInfo.userType === "EXTERNAL") {
      navigate("/application/permission-required", { replace: true });
    } else if (
      userInfo &&
      location.pathname === "/application/admin" &&
      ["EXTERNAL", "READ_ONLY"].includes(userInfo.userType)
    ) {
      navigate("/application/permission-required", { replace: true });
    }
  }, [userInfo, navigate, location.pathname]);

  return (
    <Grid
      templateAreas={`"header header"
  "main main"
  "footer footer"`}
      gridTemplateRows={`${ui.height.navbar} 1fr ${ui.height.footer}`}
      background="background"
    >
      <GridItem area={"header"}>
        <Navbar
          {...props}
          userInfo={userInfo ?? getDeniedUserInfoResponse(email)}
          companies={companies}
          setDefaultCompany={(company: ICompanyDto | undefined) => {
            setDefaultCompany(company);
          }}
          defaultCompany={defaultCompany}
        />
      </GridItem>
      <GridItem area={"main"}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>{props.routes}</Routes>
        </Suspense>
      </GridItem>
    </Grid>
  );
};
