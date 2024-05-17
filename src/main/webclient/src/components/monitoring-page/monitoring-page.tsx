import {
  Bridge,
  DeviceModel,
  Gateway,
  Sensor,
  deviceStatus,
} from "../../types/deviceModel";
import { AllDevicesView } from "../layout/monitoring-tables/all-devices-view/all-devices-view";

export const MonitoringPage = () => {
  const deviceModel = new DeviceModel([
    new Bridge("bridge1", deviceStatus.active, new Date(), [
      new Gateway("gateway1", deviceStatus.active, new Date(), [
        new Sensor("sensor1", deviceStatus.active, new Date()),
        new Sensor("sensor2", deviceStatus.active, new Date()),
      ]),
      new Gateway("gateway2", deviceStatus.active, new Date(), [])
    ]),
    new Bridge("bridge2", deviceStatus.active, new Date(), [
      new Gateway("gateway3", deviceStatus.active, new Date(), [
        new Sensor("sensor3", deviceStatus.active, new Date()),
      ])
    ])
  ]);
  return (
    <AllDevicesView {...deviceModel}/>
  );
};
