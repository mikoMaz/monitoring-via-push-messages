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
import { IHistoryChartData } from "../types/IHistoryChartData";

export class TestAPIClient implements IAPIClient {
  public getUserInfo = (accessToken: string, email?: string) => {
    const user: IUserInfoResponse = {
      email: email ?? "test_email@test.com",
      userType: "SUPER_ADMIN",
    };
    return Promise.resolve(user);
  };

  public getUpdatedDeviceModel = (accessToken: string, id: string) => {
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
    accessToken: string
  ) => {
    return Promise.resolve(99.8);
  };

  public getAllDevicesHistory = (id: string, accessToken: string) => {
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

  public validatePreviewSecret = (
    secret: string,
    company: string
  ): Promise<boolean> => {
    if (secret === "12345" && company === "test-company") {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  };

  public getPreviewDeviceModel = (secret: string, id: string) => {
    return this.getUpdatedDeviceModel(secret, id);
  };

  public getPreviewDevicesHistory = (secret: string, id: string) => {
    return this.getAllDevicesHistory(id, secret);
  };

  public postCSVData = async (accessToken: string, type: string, tableName: string, file: File) => {
    if (Math.floor(Math.random() * 4) / 3) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        throw new Error("Failed to upload file");
      });
    } else {
      return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        return 200;
      });
    }
  };

  public getDataHistoryChart = (
    dateFrom: string,
    dateTo: string
  ): Promise<IHistoryChartData[]> => {
    const parseDate = (dateString: string): Date => {
      const [day, month, year] = dateString.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const startDate = dateFrom.split("T")[0];
    const endDate = dateTo.split("T")[0];

    return Promise.resolve([
      { timestamp: "01-12-2024", active: 90, inactive: 4, disabled: 6 },
      { timestamp: "02-12-2024", active: 92, inactive: 3, disabled: 5 },
      { timestamp: "03-12-2024", active: 85, inactive: 5, disabled: 10 },
      { timestamp: "04-12-2024", active: 88, inactive: 6, disabled: 6 },
      { timestamp: "05-12-2024", active: 93, inactive: 4, disabled: 3 },
      { timestamp: "06-12-2024", active: 80, inactive: 7, disabled: 13 },
      { timestamp: "07-12-2024", active: 85, inactive: 5, disabled: 10 },
      { timestamp: "08-12-2024", active: 89, inactive: 3, disabled: 8 },
      { timestamp: "09-12-2024", active: 91, inactive: 2, disabled: 7 },
      { timestamp: "10-12-2024", active: 87, inactive: 6, disabled: 7 },
      { timestamp: "11-12-2024", active: 84, inactive: 5, disabled: 11 },
      { timestamp: "12-12-2024", active: 90, inactive: 4, disabled: 6 },
      { timestamp: "13-12-2024", active: 82, inactive: 5, disabled: 13 },
      { timestamp: "14-12-2024", active: 88, inactive: 3, disabled: 9 },
      { timestamp: "15-12-2024", active: 94, inactive: 2, disabled: 4 },
      { timestamp: "16-12-2024", active: 86, inactive: 7, disabled: 7 },
      { timestamp: "17-12-2024", active: 89, inactive: 4, disabled: 7 },
      { timestamp: "18-12-2024", active: 92, inactive: 3, disabled: 5 },
      { timestamp: "19-12-2024", active: 81, inactive: 5, disabled: 14 },
      { timestamp: "20-12-2024", active: 87, inactive: 4, disabled: 9 },
      { timestamp: "21-12-2024", active: 90, inactive: 3, disabled: 7 },
      { timestamp: "22-12-2024", active: 85, inactive: 6, disabled: 9 },
      { timestamp: "23-12-2024", active: 82, inactive: 7, disabled: 11 },
      { timestamp: "24-12-2024", active: 88, inactive: 4, disabled: 8 },
      { timestamp: "25-12-2024", active: 86, inactive: 5, disabled: 9 },
      { timestamp: "26-12-2024", active: 94, inactive: 1, disabled: 5 },
      { timestamp: "27-12-2024", active: 83, inactive: 5, disabled: 12 },
      { timestamp: "28-12-2024", active: 90, inactive: 1, disabled: 9 },
      { timestamp: "29-12-2024", active: 80, inactive: 5, disabled: 15 },
      { timestamp: "30-12-2024", active: 70, inactive: 11, disabled: 19 },
      { timestamp: "31-12-2024", active: 85, inactive: 5, disabled: 10 },
    ]).then((data) => {
      const filteredData = data.filter((entry) => {
        const entryDate = formatDate(parseDate(entry.timestamp));
        return entryDate >= startDate && entryDate <= endDate;
      });
      return filteredData;
    });
  };

  public postAddCompany = (accessToken: string, companyName: string) => {
    if (Math.floor(Math.random() * 4) / 3) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return 409;
      });
    } else {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return 200;
      });
    }
  };

  public postChangeCompanySecret = (
    accessToken: string,
    companyId: number,
    newSecret: string
  ) => {
    if (Math.floor(Math.random() * 4) / 3) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return 500;
      });
    } else {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return 200;
      });
    }
  };

  public getAllCompanies = (accessToken: string) => {
    return Promise.resolve([
      { companyId: 1, companyName: "Company1" },
      { companyId: 2, companyName: "Company2" },
      { companyId: 3, companyName: "Company3" },
      { companyId: 4, companyName: "Company4" },
    ]);
  };

  public getUsersFromCompany = (accessToken: string, companyId: number) => {
    const users: ICompanyUser[] = [
      {
        id: 1,
        companyId: 1,
        name: "John",
        surname: "Doe",
        role: "ADMIN",
      },
      {
        id: 2,
        companyId: 1,
        name: "Alice",
        surname: "Johnson",
        role: "ADMIN",
      },
      {
        id: 3,
        companyId: 1,
        name: "Bob",
        surname: "Smith",
        role: "READ_ONLY",
      },
      {
        id: 4,
        companyId: 2,
        name: "Eve",
        surname: "Adams",
        role: "SUPER_ADMIN",
      },
      {
        id: 5,
        companyId: 2,
        name: "Charlie",
        surname: "Brown",
        role: "READ_ONLY",
      },
      {
        id: 6,
        companyId: 3,
        name: "David",
        surname: "Williams",
        role: "ADMIN",
      },
      {
        id: 7,
        companyId: 3,
        name: "Grace",
        surname: "Lee",
        role: "EXTERNAL",
      },
      {
        id: 8,
        companyId: 3,
        name: "Stachu",
        surname: "Jones",
        role: "READ_ONLY",
      },
      {
        id: 9,
        companyId: 4,
        name: "James",
        surname: "Harris",
        role: "READ_ONLY",
      },
      {
        id: 10,
        companyId: 4,
        name: "Nina",
        surname: "Patel",
        role: "SUPER_ADMIN",
      },
    ];
    return Promise.resolve(
      users.filter((user) => {
        return user.companyId === companyId;
      })
    );
  };

  public updateUsersPermissions = (
    accessToken: string,
    users: ICompanyUser[],
    companyId: number
  ) => {
    if (Math.floor(Math.random() * 4) / 3) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return 500;
      });
    } else {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        return 200;
      });
    }
  };

  public addNewCompanyUser = (
    accessToken: string,
    companyId: number,
    userName: string,
    userSurname: string,
    email: string
  ) => {
    const body = JSON.stringify({
      companyId: companyId,
      name: userName,
      surname: userSurname,
      email: email,
    });
    console.log(body);
    if (Math.floor(Math.random() * 4) / 3) {
      return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        return 500;
      });
    } else {
      return new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
        return 200;
      });
    }
  };
}
