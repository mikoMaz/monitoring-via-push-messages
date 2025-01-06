import axios, { AxiosError } from "axios";
import {
  AllDevicesUptimeJson,
  DeviceModel,
  DeviceTreeModelJson,
  DeviceUptimeJson,
  createDeviceModelFromJson,
  deviceType,
  emptyAllDevicesUptimeJson,
} from "../types/deviceModel";
import {
  getDeniedUserInfoResponse,
  IUserInfoResponse,
} from "../types/IUserInfoResponse";
import config from "../config/config.json";
import { TestAPIClient } from "./test-api-client";
import { ICompanyUser } from "../types/ICompanyUser";
import { IHistoryChartData } from "../types/IHistoryChartData";

export interface IAPIClient {
  getUserInfo: (
    accessToken: string,
    email?: string
  ) => Promise<IUserInfoResponse>;
  getUpdatedDeviceModel: (
    accessToken: string,
    email: string,
    id: string,
  ) => Promise<DeviceModel>;
  getDeviceUptime: (
    type: deviceType,
    id: string,
    accessToken: string,
    email: string
  ) => Promise<number>;
  getAllDevicesHistory: (
    id: string,
    accessToken: string,
    email: string
  ) => Promise<AllDevicesUptimeJson>;
  validatePreviewSecret: (secret: string, company: string) => Promise<boolean>;
  getPreviewDeviceModel: (secret: string, id: string) => Promise<DeviceModel>;
  getPreviewDevicesHistory: (
    secret: string,
    id: string
  ) => Promise<AllDevicesUptimeJson>;
  getAllCompanies: () => Promise<String[]>;
  getUsersFromCompany: (company: string) => Promise<ICompanyUser[]>;
  postCSVData: (type: string, tableName: string, file: File) => Promise<number>;
  getDataHistoryChart: (
    dateFrom: string,
    dateTo: string
  ) => Promise<IHistoryChartData[]>;
  updateUsersPermissions: (
    users: ICompanyUser[],
    company: string
  ) => Promise<void>;
}

export class APIClient implements IAPIClient {
  private testApiClient: TestAPIClient;

  public constructor() {
    this.testApiClient = new TestAPIClient();
  }

  private getAppVerionApiUrl = () => {
    const host = window.location.hostname;
    switch (host) {
      case config.appVersions.LOCAL.HOST:
        return config.appVersions.LOCAL.API_URL;
      case config.appVersions.REMOTE.HOST:
        return config.appVersions.REMOTE.API_URL;
      default:
        console.error("Hostname didn't match. Couldn't provide api adress");
        return "";
    }
  };

  private useTestData = () => {
    const host = window.location.hostname;
    if (host === config.appVersions.LOCAL.HOST) {
      return config.appVersions.LOCAL.USE_TEST_DATA;
    }
    else if (host === config.appVersions.REMOTE.HOST) {
      return config.appVersions.REMOTE.USE_TEST_DATA;
    }
    return false;
  };

  public getUserInfo = async (
    accessToken: string,
    email?: string
  ): Promise<IUserInfoResponse> => {
    const apiURL = `${this.getAppVerionApiUrl()}/api/v1/user/userInfo`;
    if (this.useTestData()) {
      return this.testApiClient.getUserInfo(accessToken, email);
    }
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data: IUserInfoResponse = response.data;
        return data;
      })
      .catch((error: AxiosError) => {
        console.error(
          "User was permitted to endter the website",
          error.message
        );
        if (error.code === "401") {
          return getDeniedUserInfoResponse(email);
        } else {
          return getDeniedUserInfoResponse(email);
        }
      });
  };

  public getUpdatedDeviceModel = async (accessToken: string, email: string, id: string) => {
    const apiURL = `${this.getAppVerionApiUrl()}/api/v1/user/jsonTree?id=${id}`;
    if (this.useTestData()) {
      return this.testApiClient.getUpdatedDeviceModel(accessToken, email);
    }
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Email: `${email}`,
        },
      })
      .then((response) => {
        const data: DeviceTreeModelJson = response.data;
        return createDeviceModelFromJson(data);
      })
      .catch(function (error) {
        console.log("error");
        console.error(error);
        return new DeviceModel();
      });
  };

  public getDeviceUptime = async (
    type: deviceType,
    id: string,
    accessToken: string,
    email: string
  ) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/history?id=${type}&device_id=${id}`;
    if (this.useTestData()) {
      return this.testApiClient.getDeviceUptime(type, id, accessToken, email);
    }
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Email: `${email}`,
        },
      })
      .then((response) => {
        const data: DeviceUptimeJson = response.data;
        return data.uptime;
      })
      .catch(function (error) {
        console.log("error");
        console.error(error);
        return 0;
      });
  };

  public getAllDevicesHistory = async (
    id: string,
    accessToken: string,
    email: string
  ): Promise<AllDevicesUptimeJson> => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/historyTree?id=${id}`;
    if (this.useTestData()) {
      return this.testApiClient.getAllDevicesHistory(id, accessToken, email);
    }
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Email: `${email}`,
        },
      })
      .then((response) => {
        const data: AllDevicesUptimeJson = response.data;
        return data;
      })
      .catch(function (error) {
        console.log("error");
        console.error(error);
        return emptyAllDevicesUptimeJson;
      });
  };

  public validatePreviewSecret = async (
    secret: string,
    company: string
  ): Promise<boolean> => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/preview/check-authentication`;
    if (this.useTestData()) {
      return this.testApiClient.validatePreviewSecret(secret, company);
    }

    return axios
      .get(apiUrl, {
        headers: {
          CompanySecret: `${secret}`,
          Company: `${company}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        console.error(error.message);
        return false;
      });
  };

  public getPreviewDeviceModel = async (secret: string, id: string) => {
    const apiURL = `${this.getAppVerionApiUrl()}/api/v1/preview/jsonTree?id=${id}`;
    
    if (this.useTestData()) {
      return this.testApiClient.getPreviewDeviceModel(secret, id);
    }
    return axios
      .get(apiURL, {
        headers: {
          CompanySecret: `${secret}`,
          Company: `${id}`,
        },
      })
      .then((response) => {
        const data: DeviceTreeModelJson = response.data;
        return createDeviceModelFromJson(data);
      })
      .catch(function (error) {
        console.log("error");
        console.error(error);
        return new DeviceModel();
      });
  };

  public getPreviewDevicesHistory = async (secret: string, id: string) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/preview/historyTree?id=${id};`;
    if (this.useTestData()) {
      return this.testApiClient.getPreviewDevicesHistory(secret, id);
    }
    return axios
      .get(apiUrl, {
        headers: {
          CompanySecret: `${secret}`,
          Company: `${id}`,
        },
      })
      .then((response) => {
        const data: AllDevicesUptimeJson = response.data;
        return data;
      })
      .catch(function (error) {
        console.log("error");
        console.error(error);
        return emptyAllDevicesUptimeJson;
      });
  };

  public getAllCompanies = () => {
    return this.testApiClient.getAllCompanies();
  };

  public getUsersFromCompany = (company: string) => {
    return this.testApiClient.getUsersFromCompany(company);
  };

  public postCSVData = async (type: string, tableName: string, file: File) => {
    if (this.useTestData()) {
      return this.testApiClient.postCSVData(type, tableName, file);
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("tableName", tableName);
    formData.append("file", file);

    const apiURL = `${this.getAppVerionApiUrl()}/api/v1/upload-csv`;

    return axios
      .post(apiURL, formData)
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
      });
  };

  public getDataHistoryChart = (
    dateFrom: string,
    dateTo: string
  ): Promise<IHistoryChartData[]> => {
    return this.testApiClient.getDataHistoryChart(dateFrom, dateTo);
  };

  public updateUsersPermissions = (users: ICompanyUser[], company: string) => {
    return this.testApiClient.updateUsersPermissions(users, company);
  };
}
