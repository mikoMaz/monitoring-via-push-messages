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
import {
  formatRawIHistoryChartData,
  IHistoryChartData,
} from "../types/IHistoryChartData";
import { getEmptyPreset } from "../types/chartTemplate";

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

    if (id === "1" || id === "test-company") {
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
    if (secret === "12345" && (company === "test-company" || "1")) {
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

  public getPreviewDataHistoryChart = async (secret: string, name: string) => {
    const model = getEmptyPreset().chartModel;
    return this.getDataHistoryChart(
      "accessToken",
      1,
      model.dateFrom,
      model.dateTo
    );
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
    // const parseDate = (dateString: string): Date => {
    //   return new Date(dateString);
    // };

    // const formatDate = (date: Date): string => {
    //   const year = date.getFullYear();
    //   const month = String(date.getMonth() + 1).padStart(2, "0");
    //   const day = String(date.getDate()).padStart(2, "0");
    //   return `${year}-${month}-${day}`;
    // };

    // const addDays = (date: Date, days: number): Date => {
    //   const result = new Date(date);
    //   result.setDate(result.getDate() + days);
    //   return result;
    // };

    // const getPercentValueOfAllDevices = (allDevices: number, devices: number) => {
    //   return +((devices / allDevices).toFixed(2));
    // }

    // const startDate = parseDate(dateFrom);
    // const endDate = parseDate(dateTo);

    // console.log("Start date:", startDate);
    // console.log("End date:", endDate);

    return Promise.resolve([
      { timestamp: 0, active: 50, inactive: 39, disabled: 11 },
      { timestamp: 1, active: 60, inactive: 29, disabled: 11 },
      { timestamp: 2, active: 70, inactive: 19, disabled: 11 },
      { timestamp: 3, active: 40, inactive: 49, disabled: 11 },
      { timestamp: 4, active: 55, inactive: 34, disabled: 11 },
      { timestamp: 5, active: 65, inactive: 24, disabled: 11 },
      { timestamp: 6, active: 45, inactive: 44, disabled: 11 },
      { timestamp: 7, active: 35, inactive: 54, disabled: 11 },
      { timestamp: 8, active: 25, inactive: 64, disabled: 11 },
      { timestamp: 9, active: 75, inactive: 14, disabled: 11 },
      { timestamp: 10, active: 80, inactive: 9, disabled: 11 },
      { timestamp: 11, active: 30, inactive: 59, disabled: 11 },
      { timestamp: 12, active: 50, inactive: 39, disabled: 11 },
      { timestamp: 13, active: 60, inactive: 29, disabled: 11 },
      { timestamp: 14, active: 70, inactive: 19, disabled: 11 },
      { timestamp: 15, active: 40, inactive: 49, disabled: 11 },
      { timestamp: 16, active: 55, inactive: 34, disabled: 11 },
      { timestamp: 17, active: 65, inactive: 24, disabled: 11 },
      { timestamp: 18, active: 45, inactive: 44, disabled: 11 },
      { timestamp: 19, active: 35, inactive: 54, disabled: 11 },
      { timestamp: 20, active: 25, inactive: 64, disabled: 11 },
      { timestamp: 21, active: 75, inactive: 14, disabled: 11 },
      { timestamp: 22, active: 80, inactive: 9, disabled: 11 },
      { timestamp: 23, active: 30, inactive: 59, disabled: 11 },
      { timestamp: 24, active: 50, inactive: 39, disabled: 11 },
      { timestamp: 25, active: 60, inactive: 29, disabled: 11 },
      { timestamp: 26, active: 70, inactive: 19, disabled: 11 },
      { timestamp: 27, active: 40, inactive: 49, disabled: 11 },
      { timestamp: 28, active: 55, inactive: 34, disabled: 11 },
      { timestamp: 29, active: 65, inactive: 24, disabled: 11 },
      { timestamp: 30, active: 45, inactive: 44, disabled: 11 },
      { timestamp: 31, active: 52, inactive: 37, disabled: 11 },
      { timestamp: 32, active: 62, inactive: 27, disabled: 11 },
      { timestamp: 33, active: 72, inactive: 17, disabled: 11 },
      { timestamp: 34, active: 42, inactive: 47, disabled: 11 },
      { timestamp: 35, active: 57, inactive: 32, disabled: 11 },
      { timestamp: 36, active: 67, inactive: 22, disabled: 11 },
      { timestamp: 37, active: 47, inactive: 42, disabled: 11 },
      { timestamp: 38, active: 37, inactive: 52, disabled: 11 },
      { timestamp: 39, active: 27, inactive: 62, disabled: 11 },
      { timestamp: 40, active: 77, inactive: 12, disabled: 11 },
      { timestamp: 41, active: 82, inactive: 7, disabled: 11 },
      { timestamp: 42, active: 32, inactive: 57, disabled: 11 },
      { timestamp: 43, active: 53, inactive: 36, disabled: 11 },
      { timestamp: 44, active: 63, inactive: 26, disabled: 11 },
      { timestamp: 45, active: 73, inactive: 16, disabled: 11 },
      { timestamp: 46, active: 43, inactive: 46, disabled: 11 },
      { timestamp: 47, active: 58, inactive: 31, disabled: 11 },
      { timestamp: 48, active: 68, inactive: 21, disabled: 11 },
      { timestamp: 49, active: 48, inactive: 41, disabled: 11 },
      { timestamp: 50, active: 38, inactive: 51, disabled: 11 },
      { timestamp: 51, active: 28, inactive: 61, disabled: 11 },
      { timestamp: 52, active: 78, inactive: 11, disabled: 11 },
      { timestamp: 53, active: 83, inactive: 6, disabled: 11 },
      { timestamp: 54, active: 33, inactive: 56, disabled: 11 },
      { timestamp: 55, active: 54, inactive: 35, disabled: 11 },
      { timestamp: 56, active: 64, inactive: 25, disabled: 11 },
      { timestamp: 57, active: 74, inactive: 15, disabled: 11 },
      { timestamp: 58, active: 44, inactive: 45, disabled: 11 },
      { timestamp: 59, active: 59, inactive: 30, disabled: 11 },
      { timestamp: 60, active: 69, inactive: 20, disabled: 11 },
      { timestamp: 61, active: 49, inactive: 40, disabled: 11 },
      { timestamp: 62, active: 66, inactive: 23, disabled: 11 },
      { timestamp: 63, active: 71, inactive: 18, disabled: 11 },
      { timestamp: 64, active: 41, inactive: 48, disabled: 11 },
      { timestamp: 65, active: 56, inactive: 33, disabled: 11 },
      { timestamp: 66, active: 61, inactive: 28, disabled: 11 },
      { timestamp: 67, active: 46, inactive: 43, disabled: 11 },
      { timestamp: 68, active: 36, inactive: 53, disabled: 11 },
      { timestamp: 69, active: 26, inactive: 63, disabled: 11 },
      { timestamp: 70, active: 76, inactive: 13, disabled: 11 },
      { timestamp: 71, active: 81, inactive: 8, disabled: 11 },
      { timestamp: 72, active: 31, inactive: 58, disabled: 11 },
      { timestamp: 73, active: 51, inactive: 38, disabled: 11 },
      { timestamp: 74, active: 61, inactive: 28, disabled: 11 },
      { timestamp: 75, active: 71, inactive: 18, disabled: 11 },
      { timestamp: 76, active: 39, inactive: 50, disabled: 11 },
      { timestamp: 77, active: 54, inactive: 35, disabled: 11 },
      { timestamp: 78, active: 66, inactive: 23, disabled: 11 },
      { timestamp: 79, active: 44, inactive: 45, disabled: 11 },
      { timestamp: 80, active: 34, inactive: 55, disabled: 11 },
      { timestamp: 81, active: 24, inactive: 65, disabled: 11 },
      { timestamp: 82, active: 74, inactive: 15, disabled: 11 },
      { timestamp: 83, active: 84, inactive: 5, disabled: 11 },
      { timestamp: 84, active: 29, inactive: 60, disabled: 11 },
      { timestamp: 85, active: 59, inactive: 30, disabled: 11 },
      { timestamp: 86, active: 69, inactive: 20, disabled: 11 },
      { timestamp: 87, active: 79, inactive: 10, disabled: 11 },
      { timestamp: 88, active: 49, inactive: 40, disabled: 11 },
      { timestamp: 89, active: 64, inactive: 25, disabled: 11 },
      { timestamp: 90, active: 74, inactive: 15, disabled: 11 },
    ]).then((data) => {
      return formatRawIHistoryChartData(data, dateFrom, dateTo);
      // return data
      //   .map((entry) => {
      //     const entryDate = addDays(startDate, entry.timestamp);
      //     const allDevices = entry.active + entry.inactive + entry.disabled;
      //     // console.log(formatDate(entryDate));
      //     return {
      //       active: entry.active,
      //       inactive: entry.inactive,
      //       disabled: entry.disabled,
      //       timestamp: formatDate(entryDate),
      //       allDevices: allDevices,
      //       activePercent: getPercentValueOfAllDevices(allDevices, entry.active),
      //       inactivePercent: getPercentValueOfAllDevices(allDevices, entry.inactive),
      //       disabledPercent: getPercentValueOfAllDevices(allDevices, entry.disabled),
      //     };
      //   })
      //   .filter((entry) => {
      //     const entryDate = parseDate(entry.timestamp);
      //     return entryDate >= startDate && entryDate <= endDate;
      //   });
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
