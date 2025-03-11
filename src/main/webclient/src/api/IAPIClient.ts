import { DeviceModel, AllDevicesUptimeJson } from "../types/deviceModel";
import { ICompanyDto } from "../types/ICompanyDto";
import { ICompanyUser } from "../types/ICompanyUser";
import { IHistoryChartData } from "../types/IHistoryChartData";
import { IHistoryValue } from "../types/IHistoryValues";
import { IUserInfoResponse } from "../types/IUserInfoResponse";

export interface IAPIClient extends IPreviewClient, IAdminPanelClient {
  getUserInfo: (
    accessToken: string,
    email?: string
  ) => Promise<IUserInfoResponse>;
  getUpdatedDeviceModel: (
    accessToken: string,
    id: string
  ) => Promise<DeviceModel>;
  getDeviceUptime: (
    companyId: string,
    id: string,
    accessToken: string
  ) => Promise<number>;
  getAllDevicesHistory: (
    id: string,
    accessToken: string
  ) => Promise<AllDevicesUptimeJson>;
  getDataHistoryChart: (
    accessToken: string,
    companyId: number,
    dateFrom: string,
    dateTo: string
  ) => Promise<IHistoryChartData[]>;
  getHistoryValues: (
    accessToken: string,
    companyId: number,
    dateFrom: string,
    dateTo: string
  ) => Promise<IHistoryValue[]>;
}

interface IPreviewClient {
  validatePreviewSecret: (secret: string, company: string) => Promise<boolean>;
  getPreviewDeviceModel: (secret: string, name: string) => Promise<DeviceModel>;
  getPreviewDataHistoryChart: (
    secret: string,
    name: string
  ) => Promise<IHistoryChartData[]>;
  getPreviewHistoryValues: (
    secret: string,
    name: string,
    dateFrom: string,
    dateTo: string
  ) => Promise<IHistoryValue[]>;
  getPreviewDevicesHistory: (
    secret: string,
    name: string
  ) => Promise<AllDevicesUptimeJson>;
}

interface IAdminPanelClient {
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
  addNewCompanyUser: (
    accessToken: string,
    companyId: number,
    userName: string,
    userSurname: string,
    email: string
  ) => Promise<number>;
  postCSVData: (
    accessToken: string,
    type: string,
    tableName: string,
    file: File
  ) => Promise<number>;
}
