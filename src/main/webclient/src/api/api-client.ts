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
import { ICompanyDto } from "../types/ICompanyDto";
import { access } from "fs";

export interface IAPIClient {
  getUserInfo: (
    accessToken: string,
    email?: string
  ) => Promise<IUserInfoResponse>;
  getUpdatedDeviceModel: (
    accessToken: string,
    id: string
  ) => Promise<DeviceModel>;
  getDeviceUptime: (
    type: deviceType,
    id: string,
    accessToken: string
  ) => Promise<number>;
  getAllDevicesHistory: (
    id: string,
    accessToken: string
  ) => Promise<AllDevicesUptimeJson>;
  validatePreviewSecret: (secret: string, company: string) => Promise<boolean>;
  getPreviewDeviceModel: (secret: string, id: string) => Promise<DeviceModel>;
  getPreviewDevicesHistory: (
    secret: string,
    id: string
  ) => Promise<AllDevicesUptimeJson>;
  postCSVData: (type: string, tableName: string, file: File) => Promise<number>;
  getDataHistoryChart: (
    dateFrom: string,
    dateTo: string
  ) => Promise<IHistoryChartData[]>;
  postAddCompany: (accessToken: string, companyName: string) => Promise<number>;
  postChangeCompanySecret: (
    accessToken: string,
    companyId: number,
    newSecret: string
  ) => Promise<number>;
  getAllCompanies: (accessToken: string) => Promise<ICompanyDto[]>;
  getUsersFromCompany: (
    accessToken: string,
    companyId: number
  ) => Promise<ICompanyUser[]>;
  updateUsersPermissions: (
    accessToken: string,
    users: ICompanyUser[],
    companyId: number
  ) => Promise<number>;
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
        if (response.data) {
          const data: IUserInfoResponse = response.data;
          return data;
        } else {
          throw new AxiosError("Data is null");
        }
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

  public getUpdatedDeviceModel = async (
    accessToken: string,
    id: string
  ) => {
    const apiURL = `${this.getAppVerionApiUrl()}/api/v1/user/jsonTree?id=${id}`;
    if (this.useTestData()) {
      return this.testApiClient.getUpdatedDeviceModel(accessToken, id);
    }
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        if (response.data) {
          const data: DeviceTreeModelJson = response.data;
          return createDeviceModelFromJson(data);
        } else {
          throw new AxiosError("Data is null");
        }
      })
      .catch(function (error) {
        console.error(error);
        return new DeviceModel();
      });
  };

  public getDeviceUptime = async (
    type: deviceType,
    id: string,
    accessToken: string
  ) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/history?id=${type}&device_id=${id}`;
    if (this.useTestData()) {
      return this.testApiClient.getDeviceUptime(type, id, accessToken);
    }
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        if (response.data) {
          const data: DeviceUptimeJson = response.data;
          return data.uptime;
        } else {
          throw new AxiosError("Data is null");
        }
      })
      .catch(function (error) {
        console.error(error);
        return 0;
      });
  };

  public getAllDevicesHistory = async (
    id: string,
    accessToken: string
  ): Promise<AllDevicesUptimeJson> => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/historyTree?id=${id}`;
    if (this.useTestData()) {
      return this.testApiClient.getAllDevicesHistory(id, accessToken);
    }
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        if (response.data) {
          const data: AllDevicesUptimeJson = response.data;
          return data;
        } else {
          throw new AxiosError("Data is null");
        }
      })
      .catch(function (error) {
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
        console.error(error);
        return new DeviceModel();
      });
  };

  public getPreviewDevicesHistory = async (secret: string, id: string) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/preview/historyTree?id=${id}`;
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
        console.error(error);
        return emptyAllDevicesUptimeJson;
      });
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

  public postAddCompany = (accessToken: string, companyName: string) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/company/create?companyName=${companyName}`;
    if (this.useTestData()) {
      return this.testApiClient.postAddCompany(accessToken, companyName);
    }
    return axios
      .post(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        return response.status;
      })
      .catch(function (error) {
        console.error(error);
        throw new Error("An error occurred while creating the company.");
      });
  };

  public postChangeCompanySecret = (
    accessToken: string,
    companyId: number,
    newSecret: string
  ) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/company/change-company-password?companyId=${companyId}&password=${newSecret}`;
    if (this.useTestData()) {
      return this.testApiClient.postChangeCompanySecret(
        accessToken,
        companyId,
        newSecret
      );
    }
    return axios
      .post(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        return response.status;
      })
      .catch(function (error) {
        console.error(error);
        throw new Error("An error occurred while creating the company.");
      });
  };

  public getAllCompanies = (accessToken: string) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/company/get-companies`;
    if (this.useTestData()) {
      return this.testApiClient.getAllCompanies(accessToken);
    }
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data: ICompanyDto[] = response.data;
        return data;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
  };

  public getUsersFromCompany = (accessToken: string, companyId: number) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/company/get-users-from-company?companyId=${companyId}`;
    if (this.useTestData()) {
      return this.testApiClient.getUsersFromCompany(accessToken, companyId);
    }
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
      })
      .then((response) => {
        const data: ICompanyUser[] = response.data;
        return data;
      })
      .catch(function (error) {
        console.error(error);
        return [];
      });
  };

  public updateUsersPermissions = (
    accessToken: string,
    users: ICompanyUser[],
    companyId: number
  ) => {
    const apiUrl = `${this.getAppVerionApiUrl()}/api/v1/user/company/update-company-users?companyId=${companyId}`;
    if (this.useTestData()) {
      return this.testApiClient.updateUsersPermissions(
        accessToken,
        users,
        companyId
      );
    }
    return axios
      .put(apiUrl, users, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        return response.status;
      })
      .catch((error) => {
        console.error(error);
        throw new Error("An error occurred while updating users permissions.");
      });
  };
}
