import {
  Bridge,
  DeviceModel,
  Gateway,
  IDeviceModel,
  Sensor,
  createDeviceModel,
  deviceStatus,
} from "../types/deviceModel";
import axios from "axios";

const apuURL = "http://localhost:8080/api/v1/kluczdostepu?id=1";
export class APIClient {
  public static getTestDataModel = () => {
    return new DeviceModel([
      new Bridge("bridge1", deviceStatus.active, new Date(), [
        new Gateway("gateway1", deviceStatus.active, new Date(), [
          new Sensor("sensor1", deviceStatus.active, new Date()),
          new Sensor("sensor2", deviceStatus.active, new Date()),
        ]),
        new Gateway("gateway2", deviceStatus.active, new Date(), []),
      ]),
      new Bridge("bridge2", deviceStatus.disabled, new Date(), [
        new Gateway("gateway3", deviceStatus.disabled, new Date(), [
          new Sensor("sensor3", deviceStatus.disabled, new Date()),
        ]),
      ]),
    ]);
  };

  public static jsonToObject = async (): Promise<DeviceModel> => {
    var json = require("../test/example.json");
    const data: IDeviceModel = json;
    console.log(createDeviceModel(data));
    return createDeviceModel(data);
  };

  public static getRecentUpdates = () => {
    axios
      .get(apuURL)
      .then((response) => {
        const data: IDeviceModel = response.data;
        return createDeviceModel(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
}
