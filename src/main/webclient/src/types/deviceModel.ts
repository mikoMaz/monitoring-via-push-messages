export enum deviceStatus {
  disabled,
  active,
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
  sensors: Sensor[];
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
  sensors: Sensor[];

  constructor(
    id: string,
    status: deviceStatus,
    lastPinged: Date,
    gateways: Gateway[],
    sensors?: Sensor[]
  ) {
    this.id = id;
    this.status = status;
    this.lastPinged = lastPinged;
    this.deviceType = deviceType.bridge;
    this.gateways = gateways;
    this.sensors = sensors ? sensors : [];
  }
}

interface IDeviceModel {
  bridges: IBridge[];
  gateways: IGateway[];
  sensors: ISensor[];
}

interface ITreeModelDevice {
  id: string;
  status: deviceStatus;
  lastPinged: number;
  deviceType: deviceType;
  children?: string[] | undefined;
}
interface IDeviceTreeLevel {
  devices: ITreeModelDevice[];
}

export type DeviceTreeModelJson = {
  [key: string]: ITreeModelDevice[];
};

export const createDeviceModelFromJson = (json: DeviceTreeModelJson) => {
  const bridges: Bridge[] = [];
  const gateways: Gateway[] = [];
  const sensors: Sensor[] = [];
  const devices: IDeviceTreeLevel[] = Object.values(json).map((value) => {
    return { devices: value };
  });
  if (devices.length) {
    devices[0].devices.forEach((deviceTL0) => {
      if (deviceTL0.deviceType === deviceType.bridge) {
        bridges.push(
          new Bridge(
            deviceTL0.id,
            deviceTL0.status,
            new Date(deviceTL0.lastPinged),
            devices[1].devices
              .filter(
                (device) =>
                  device.deviceType === deviceType.gateway &&
                  deviceTL0.children?.includes(device.id)
              )
              .map((gateway) => {
                return new Gateway(
                  gateway.id,
                  gateway.status,
                  new Date(gateway.lastPinged),
                  devices[2].devices
                    .filter(
                      (device) =>
                        gateway.children?.includes(device.id) &&
                        device.deviceType === deviceType.sensor
                    )
                    .map((sensor) => {
                      return new Sensor(
                        sensor.id,
                        sensor.status,
                        new Date(sensor.lastPinged)
                      );
                    })
                );
              }),
            devices[1].devices
              .filter(
                (device) =>
                  device.deviceType === deviceType.sensor &&
                  deviceTL0.children?.includes(device.id)
              )
              .map((sensor) => {
                return new Sensor(
                  sensor.id,
                  sensor.status,
                  new Date(sensor.lastPinged)
                );
              })
          )
        );
      } else if (deviceTL0.deviceType === deviceType.gateway) {
        gateways.push(
          new Gateway(
            deviceTL0.id,
            deviceTL0.status,
            new Date(deviceTL0.lastPinged),
            devices[2].devices
              .filter(
                (device) =>
                  deviceTL0.children?.includes(device.id) &&
                  device.deviceType === deviceType.sensor
              )
              .map((sensor) => {
                return new Sensor(
                  sensor.id,
                  sensor.status,
                  new Date(sensor.lastPinged)
                );
              })
          )
        );
      } else {
        sensors.push(
          new Sensor(
            deviceTL0.id,
            deviceTL0.status,
            new Date(deviceTL0.lastPinged)
          )
        );
      }
    });
  }
  return new DeviceModel(bridges, gateways, sensors);
};

export class DeviceModel implements IDeviceModel {
  bridges: Bridge[];
  gateways: Gateway[];
  sensors: Sensor[];

  constructor(bridges?: Bridge[], gateways?: Gateway[], sensors?: Sensor[]) {
    this.bridges = bridges ?? [];
    this.gateways = gateways ?? [];
    this.sensors = sensors ?? [];
  }

  public getSensorsArray = (): Sensor[] => {
    const sensors: Sensor[] = [];

    this.bridges.forEach((bridge) => {
      bridge.gateways.forEach((gateway) => {
        sensors.push(...gateway.sensors);
      });
    });

    this.gateways.forEach((gateway) => {
      sensors.push(...gateway.sensors);
    });

    sensors.push(...this.sensors);

    return sensors;
  };

  public getGatewaysArray = () => {
    const gateways: Gateway[] = [];

    this.bridges.forEach((bridge) => {
      gateways.push(...bridge.gateways);
    });

    gateways.push(...this.gateways);

    return gateways;
  };

  public getBridgesArray = () => {
    return this.bridges;
  };
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
