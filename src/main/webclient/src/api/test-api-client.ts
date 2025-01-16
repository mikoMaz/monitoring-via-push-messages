import { ICompanyUser } from "../types/ICompanyUser";
import {
  Bridge,
  DeviceModel,
  deviceStatus,
  Gateway,
  Sensor,
} from "../types/deviceModel";
import { IUserInfoResponse } from "../types/IUserInfoResponse";
import { IAPIClient } from "./api-client";
import { IHistoryChartData } from "../types/IHistoryChartData";

export class TestAPIClient implements IAPIClient {
  public getUserInfo = (accessToken: string, email?: string) => {
    const user: IUserInfoResponse = {
      email: email ?? "errwarn_readonly_user@test.com",
      userType: "SUPER_ADMIN",
    };
    return Promise.resolve(user);
  };

  public getUpdatedDeviceModel = (accessToken: string, id: string) => {
    const model1 = new DeviceModel([
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
    const model2 = new DeviceModel([
      new Bridge("b6", deviceStatus.active, new Date(), [
        new Gateway("g125", deviceStatus.active, new Date(), [
          new Sensor("s166", deviceStatus.active, new Date()),
          new Sensor("s342", deviceStatus.disabled, new Date()),
          new Sensor("s23", deviceStatus.active, new Date()),
          new Sensor("s27", deviceStatus.disabled, new Date()),
        ]),
        new Gateway("g65", deviceStatus.disabled, new Date(), []),
      ]),
      new Bridge("b23", deviceStatus.disabled, new Date(), [
        new Gateway("g23", deviceStatus.disabled, new Date(), [
          new Sensor("s12", deviceStatus.disabled, new Date()),
          new Sensor("s56", deviceStatus.disabled, new Date()),
        ]),
      ]),
    ]);
    const model3 = new DeviceModel(
      [
        new Bridge("b87", deviceStatus.disabled, new Date(), [
          new Gateway("g645", deviceStatus.disabled, new Date(), [
            new Sensor("s231", deviceStatus.disabled, new Date()),
            new Sensor("s854", deviceStatus.disabled, new Date()),
          ]),
        ]),
      ],
      [
        new Gateway("g75", deviceStatus.active, new Date(), [
          new Sensor("s34", deviceStatus.active, new Date()),
          new Sensor("s74", deviceStatus.disabled, new Date()),
          new Sensor("s5", deviceStatus.active, new Date()),
        ]),
      ]
    );
    const model4 = new DeviceModel([
      new Bridge(
        "b23",
        deviceStatus.disabled,
        new Date(),
        [],
        [
          new Sensor("s12", deviceStatus.disabled, new Date()),
          new Sensor("s5", deviceStatus.disabled, new Date()),
        ]
      ),
    ]);

    if (id === "1") {
      return Promise.resolve(model1);
    } else if (id === "2") {
      return Promise.resolve(model2);
    } else if (id === "3") {
      return Promise.resolve(model3);
    } else {
      return Promise.resolve(model4);
    }
  };

  public getDeviceUptime = (
    companyId: string,
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

  public getPreviewDeviceModel = (secret: string, name: string) => {
    return this.getUpdatedDeviceModel(secret, name);
  };

  public getPreviewDevicesHistory = (secret: string, name: string) => {
    return this.getAllDevicesHistory(name, secret);
  };

  public postCSVData = async (
    accessToken: string,
    type: string,
    tableName: string,
    file: File
  ) => {
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
    accessToken: string,
    companyId: number,
    dateFrom: string,
    dateTo: string
  ): Promise<IHistoryChartData[]> => {
    const parseDate = (dateString: string): Date => {
      return new Date(dateString);
    };

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const addDays = (date: Date, days: number): Date => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const startDate = parseDate(dateFrom);
    const endDate = parseDate(dateTo);

    console.log("Start date:", startDate);
    console.log("End date:", endDate);

    return Promise.resolve([
      { timestamp: 0, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 1, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 2, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 3, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 4, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 5, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 6, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 7, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 8, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 9, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 10, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 11, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 12, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 13, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 14, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 15, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 16, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 17, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 18, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 19, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 20, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 21, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 22, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 23, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 24, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 25, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 26, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 27, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 28, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 29, active: 0, inactive: 11, disabled: 0 },
      { timestamp: 30, active: 0, inactive: 11, disabled: 0 },
    ]).then((data) => {
      return data
        .map((entry) => {
          const entryDate = addDays(startDate, entry.timestamp);
          return {
            ...entry,
            timestamp: formatDate(entryDate),
          };
        })
        .filter((entry) => {
          const entryDate = parseDate(entry.timestamp);
          return entryDate >= startDate && entryDate <= endDate;
        });
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
