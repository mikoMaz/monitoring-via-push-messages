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

  public containAnyInactiveSensors(): boolean {
    return (
      this.sensors.find((s) => {
        return s.status === deviceStatus.disabled;
      }) !== undefined
    );
  }

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

  public containAnyInactiveSensors(): boolean {
    return (
      this.sensors.find((s) => {
        return s.status === deviceStatus.disabled;
      }) !== undefined
    );
  }

  public containAnyInactiveGateway(): boolean {
    return (
      this.gateways.find((g) => {
        return g.status === deviceStatus.disabled;
      }) !== undefined
    );
  }

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

export type DeviceUptimeJson = {
  uptime: number;
};

export type AllDevicesUptimeJson = {
  uptimes: number[];
};

export const createDeviceModelFromJson = (json: DeviceTreeModelJson) => {
  const bridges: Bridge[] = [];
  const gateways: Gateway[] = [];
  const sensors: Sensor[] = [];
  const devices: IDeviceTreeLevel[] = Object.values(json).map((value) => {
    return { devices: value };
  });
  if (devices.length) {
    devices[0].devices.forEach((topLevelDevice) => {
      if (topLevelDevice.deviceType === deviceType.bridge) {
        bridges.push(
          new Bridge(
            topLevelDevice.id,
            topLevelDevice.status,
            new Date(topLevelDevice.lastPinged * 1000),
            devices[1].devices
              .filter(
                (device) =>
                  device.deviceType === deviceType.gateway &&
                  topLevelDevice.children?.includes(device.id)
              )
              .map((gateway) => {
                return new Gateway(
                  gateway.id,
                  gateway.status,
                  new Date(gateway.lastPinged * 1000),
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
                        new Date(sensor.lastPinged * 1000)
                      );
                    })
                );
              }),
            devices[1].devices
              .filter(
                (device) =>
                  device.deviceType === deviceType.sensor &&
                  topLevelDevice.children?.includes(device.id)
              )
              .map((sensor) => {
                return new Sensor(
                  sensor.id,
                  sensor.status,
                  new Date(sensor.lastPinged * 1000)
                );
              })
          )
        );
      } else if (topLevelDevice.deviceType === deviceType.gateway) {
        gateways.push(
          new Gateway(
            topLevelDevice.id,
            topLevelDevice.status,
            new Date(topLevelDevice.lastPinged * 1000),
            devices[2].devices
              .filter(
                (device) =>
                  topLevelDevice.children?.includes(device.id) &&
                  device.deviceType === deviceType.sensor
              )
              .map((sensor) => {
                return new Sensor(
                  sensor.id,
                  sensor.status,
                  new Date(sensor.lastPinged * 1000)
                );
              })
          )
        );
      } else {
        sensors.push(
          new Sensor(
            topLevelDevice.id,
            topLevelDevice.status,
            new Date(topLevelDevice.lastPinged * 1000)
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

  public getInactiveDevicesArray = () => {
    const devices: IMonitoringDevice[] = [];
    //does it copy reference?
    const bridges = this.bridges;
    const gateways = this.gateways;
    const sensors = this.sensors;
    gateways.forEach((g) => {
      sensors.push.apply(g.sensors);
    });
    bridges.forEach((b) => {
      gateways.push.apply(b.gateways);
      b.gateways.forEach((g) => {
        sensors.push.apply(g.sensors);
      });
    });
    devices.push(...this.sensors);
    devices.push(...this.gateways);
    devices.push(...this.bridges);
    return (
      devices.filter((d) => {
        if (d.status !== deviceStatus.active) {
          return d;
        }
      }) ?? []
    );
  };

  // public filterInactiveDevicesDeviceModel = (): DeviceModel => {
  //   const bridges = this.bridges.filter((b) => {
  //     if (b.status === deviceStatus.disabled) {
  //       return b;
  //     } else if (b.containAnyInactiveGateway()) {
  //       return b;
  //     } else if (
  //       b.gateways.find((b) => {
  //         b.containAnyInactiveSensors() === true;
  //       })
  //     ) {
  //       return b;
  //     }
  //   });
  //   const gateways = this.gateways.filter((g) => {
  //     if (g.status === deviceStatus.disabled) {
  //       return g;
  //     } else if (g.containAnyInactiveSensors()) {
  //       return g;
  //     }
  //   });
  //   const sensors = this.sensors.filter((s) => {
  //     s.status === deviceStatus.disabled;
  //   });
  //   return new DeviceModel(bridges, gateways, sensors);
  // };

  public static getPlaceholderDevice = (): IMonitoringDevice => {
    return {
      id: "undefined",
      status: deviceStatus.disabled,
      deviceType: deviceType.sensor,
      lastPinged: new Date(),
    };
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
