import {
  Bridge,
  DeviceModel,
  Gateway,
  Sensor,
  deviceStatus,
} from "../types/deviceModel";

export class APIClient {
  public static getRecentUpdates = () => {
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
}
