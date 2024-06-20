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
  public static getUpdatedDeviceModel = async () => {
    const apiURL = "http://localhost:8080/api/v1/kluczdostepu?id=1";
    return axios
      .get(apiURL)
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

  public static getDeviceUptime = async (type: deviceType, id: string) => {
    const apiUrl = `http://localhost:8080/api/v1/history?id=${type}&device_id=${id}`;
    return axios
      .get(apiUrl)
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

  public static getAllDevicesHistory = async (id: string): Promise<number[]> => {
    const apiUrl = `http://localhost:8080/api/v1/historyTree?id=${id}`;
    return axios.get(apiUrl).then((response) => {
      const data: AllDevicesUptimeJson = response.data;
      return data.uptimes;
    })
    .catch(function (error) {
      console.log("error");
      console.error(error);
      return [];
    });
  };
}
