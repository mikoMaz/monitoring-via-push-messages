import axios from "axios";
import {
  AllDevicesUptimeJson,
  Bridge,
  DeviceModel,
  DeviceTreeModelJson,
  DeviceUptimeJson,
  Gateway,
  Sensor,
  createDeviceModelFromJson,
  deviceStatus,
  deviceType,
} from "../types/deviceModel";

export class APIClient {
  public static getDummyDeviceModel = () => {
    return new DeviceModel([
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
  };
  public static getUserInfo = async (accessToken: string) => {
    const info = await axios.get("https://localhost:3000/userinfo",{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(info)
  }
  public static getUpdatedDeviceModel = async (accessToken: string) => {
    const apiURL = "http://localhost:8080/api/v1/kluczdostepu?id=1";
    return axios
      .get(apiURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  public static getDeviceUptime = async (
    type: deviceType,
    id: string,
    accessToken: string
  ) => {
    const apiUrl = `http://localhost:8080/api/v1/history?id=${type}&device_id=${id}`;
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  public static getAllDevicesHistory = async (
    id: string,
    accessToken: string
  ): Promise<number[]> => {
    const apiUrl = `http://localhost:8080/api/v1/historyTree?id=${id}`;
    return axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const data: AllDevicesUptimeJson = response.data;
        return data.uptimes;
      })
      .catch(function (error) {
        console.log("error");
        console.error(error);
        return [];
      });
  };

  public static getDummyDevicesHistory = () => {
    return [
      87.2, 89.7, 90.1, 90.4, 90.8, 91.3, 93.4, 96.3, 96.6, 96.6, 97.1, 97.5,
      98.3, 98.5, 98.6, 98.7, 98.9, 99.2, 99.3, 99.7, 99.7, 99.8, 99.8, 99.9,
      99.9, 99.9, 99.9,
    ];
  };
}
