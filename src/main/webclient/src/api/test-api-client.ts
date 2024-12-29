import { ICompanyUser } from "../types/ICompanyUser";
import {
  Bridge,
  DeviceModel,
  deviceStatus,
  deviceType,
  Gateway,
  Sensor,
} from "../types/deviceModel";
import { IUserInfoResponse } from "../types/IUserInfoResponse";
import { IAPIClient } from "./api-client";

export class TestAPIClient implements IAPIClient {
  public getAllCompanies = () => {
    return Promise.resolve(["Company1", "Company2", "Company3", "Company4"]);
  };
  public getUsersFromCompany = () => {
    const users: ICompanyUser[] = [
      {
        company: "Company1",
        name: "John Doe",
        role: "ADMIN",
      },
      {
        company: "Company1",
        name: "Alice Johnson",
        role: "ADMIN",
      },
      {
        company: "Company1",
        name: "Bob Smith",
        role: "READ_ONLY",
      },
      {
        company: "Company2",
        name: "Eve Adams",
        role: "SUPER_ADMIN",
      },
      {
        company: "Company2",
        name: "Charlie Brown",
        role: "READ_ONLY",
      },
      {
        company: "Company3",
        name: "David Williams",
        role: "ADMIN",
      },
      {
        company: "Company3",
        name: "Grace Lee",
        role: "EXTERNAL",
      },
      {
        company: "Company3",
        name: "Stachu Jones",
        role: "READ_ONLY",
      },
      {
        company: "Company4",
        name: "James Harris",
        role: "READ_ONLY",
      },
      {
        company: "Company4",
        name: "Nina Patel",
        role: "SUPER_ADMIN",
      },
    ];
    return Promise.resolve(users);
  };

  public getUserInfo = (accessToken: string, email?: string) => {
    const user: IUserInfoResponse = {
      email: email ?? "test_email@test.com",
      userType: "SUPER_ADMIN",
    };
    return Promise.resolve(user);
  };

  public getUpdatedDeviceModel = (accessToken: string, email: string) => {
    const model = new DeviceModel([
      new Bridge("bridge1", deviceStatus.active, new Date(), [
        new Gateway("gateway1", deviceStatus.active, new Date(), [
          new Sensor("sensor1", deviceStatus.active, new Date()),
          new Sensor("sensor2", deviceStatus.active, new Date()),
          new Sensor("sensor5", deviceStatus.disabled, new Date()),
          new Sensor("sensor9", deviceStatus.active, new Date()),
          new Sensor("sensor13", deviceStatus.disabled, new Date()),
          new Sensor("sensor22", deviceStatus.disabled, new Date()),
          new Sensor("sensor23", deviceStatus.active, new Date()),
          new Sensor("sensor27", deviceStatus.disabled, new Date()),
        ]),
        new Gateway("gateway2", deviceStatus.disabled, new Date(), []),
      ]),
      new Bridge("bridge2", deviceStatus.disabled, new Date(), [
        new Gateway("gateway3", deviceStatus.disabled, new Date(), [
          new Sensor("sensor3", deviceStatus.disabled, new Date()),
          new Sensor("sensor14", deviceStatus.disabled, new Date()),
          new Sensor("sensor17", deviceStatus.disabled, new Date()),
          new Sensor("sensor21", deviceStatus.disabled, new Date()),
        ]),
      ]),
      new Bridge("bridge3", deviceStatus.active, new Date(), [
        new Gateway("gateway4", deviceStatus.active, new Date(), [
          new Sensor("sensor4", deviceStatus.disabled, new Date()),
          new Sensor("sensor8", deviceStatus.active, new Date()),
          new Sensor("sensor10", deviceStatus.active, new Date()),
          new Sensor("sensor19", deviceStatus.active, new Date()),
        ]),
        new Gateway("gateway5", deviceStatus.active, new Date(), [
          new Sensor("sensor20", deviceStatus.disabled, new Date()),
          new Sensor("sensor34", deviceStatus.active, new Date()),
          new Sensor("sensor36", deviceStatus.disabled, new Date()),
          new Sensor("sensor39", deviceStatus.active, new Date()),
        ]),
      ]),
    ]);
    return Promise.resolve(model);
  };

  public getDeviceUptime = (
    type: deviceType,
    id: string,
    accessToken: string,
    email: string
  ) => {
    return Promise.resolve(99.8);
  };

  public getAllDevicesHistory = (
    id: string,
    accessToken: string,
    email: string
  ) => {
    const values = {
      upperLevel: [87.2, 89.7, 90.1],
      middleLevel: [90.4, 90.8, 91.3, 93.4, 96.3, 96.6, 96.6],
      bottomLevel: [
        97.1, 97.5, 98.3, 98.5, 98.6, 98.7, 98.9, 99.2, 99.3, 99.7, 99.7, 99.8,
        99.8, 99.9, 99.9, 99.9, 99.9,
      ],
    };
    return Promise.resolve(values);
  };
}
