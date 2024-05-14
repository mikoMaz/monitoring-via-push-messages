export enum deviceStatus {
  active,
  disabled,
}

export enum deviceType {
  sensor,
  gateway,
  bridge,
}

export interface IMonitoringDevice {
  id: string;
  status: deviceStatus;
  lastPinged: Date;
  deviceType: deviceType;
}

interface ISensor extends IMonitoringDevice {}

interface IGateway extends IMonitoringDevice {
  sensors: Sensor[];
}

interface IBridge extends IMonitoringDevice {
  gateways: Gateway[];
}
export class Sensor implements ISensor {
  id: string;
  status: deviceStatus;
  lastPinged: Date;
  deviceType: deviceType;

  constructor(id: string, status: deviceStatus, lastPinged: Date) {
    this.id = id;
    this.status = status;
    this.lastPinged = lastPinged;
    this.deviceType = deviceType.sensor;
  }
}

export class Gateway implements IGateway {
  id: string;
  status: deviceStatus;
  lastPinged: Date;
  deviceType: deviceType;
  sensors: Sensor[];

  constructor(
    id: string,
    status: deviceStatus,
    lastPinged: Date,
    sensors: Sensor[]
  ) {
    this.id = id;
    this.status = status;
    this.lastPinged = lastPinged;
    this.deviceType = deviceType.gateway;
    this.sensors = sensors;
  }
}

export class Bridge implements IBridge {
  id: string;
  status: deviceStatus;
  lastPinged: Date;
  deviceType: deviceType;
  gateways: Gateway[];

  constructor(
    id: string,
    status: deviceStatus,
    lastPinged: Date,
    gateways: Gateway[]
  ) {
    this.id = id;
    this.status = status;
    this.lastPinged = lastPinged;
    this.deviceType = deviceType.bridge;
    this.gateways = gateways;
  }
}

interface IDeviceModel {
  bridges: IBridge[];
  gateways: IGateway[];
  sensors: ISensor[];
}

export class DeviceModel implements IDeviceModel {
  bridges: Bridge[];
  gateways: Gateway[];
  sensors: Sensor[];

  constructor(bridges?: Bridge[], gateways?: Gateway[], sensors?: Sensor[]) {
    this.bridges = bridges ?? [];
    this.gateways = gateways ?? [];
    this.sensors = sensors ?? [];
  }
}

export function createDeviceModel(data: IDeviceModel): DeviceModel {
  const bridges = data.bridges.map(
    (bridge) =>
      new Bridge(
        bridge.id,
        bridge.status,
        new Date(bridge.lastPinged),
        bridge.gateways.map(
          (gateway) =>
            new Gateway(
              gateway.id,
              gateway.status,
              new Date(gateway.lastPinged),
              gateway.sensors.map(
                (sensor) =>
                  new Sensor(
                    sensor.id,
                    sensor.status,
                    new Date(sensor.lastPinged)
                  )
              )
            )
        )
      )
  );

  const gateways = data.gateways.map(
    (gateway) =>
      new Gateway(
        gateway.id,
        gateway.status,
        new Date(gateway.lastPinged),
        gateway.sensors.map(
          (sensor) =>
            new Sensor(sensor.id, sensor.status, new Date(sensor.lastPinged))
        )
      )
  );

  const sensors = data.sensors.map(
    (sensor) =>
      new Sensor(sensor.id, sensor.status, new Date(sensor.lastPinged))
  );

  return new DeviceModel(bridges, gateways, sensors);
}
