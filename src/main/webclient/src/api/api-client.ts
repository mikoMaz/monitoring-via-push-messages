import axios from "axios";
import {
  Bridge,
  DeviceModel,
  DeviceTreeModelJson,
  Gateway,
  Sensor,
  createDeviceModelFromJson,
  deviceStatus,
} from "../types/deviceModel";

const apuURL = "http://localhost:8080/api/v1/kluczdostepu?id=1";

export class APIClient {
  public static getDymmyDeviceModel = () => {
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
  public static getUpdatedDeviceModel = () => {
    return axios
      .get(apuURL)
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
}
