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
export interface ISomeDevice {
  id: string;
  status: number;
  lastPinged: string;
  deviceType: number;
  devices: ISomeDevice[];
}

export interface ISomeDeviceModel {
  devices: ISomeDevice[];
}

export interface IDeviceModel {
  bridges: IBridge[];
  gateways: IGateway[];
}

export const convertUnknownModelToDeviceModel = (model: ISomeDeviceModel) => {
  const bridges: Bridge[] = [];
  const gateways: Gateway[] = [];
  model.devices.map((device) => {
    if (device.deviceType.toString() === deviceType[deviceType.bridge]) {
      const gateways = device.devices.filter((device) => {
        return device.deviceType.toString() === deviceType[deviceType.gateway];
      });
      const gatewaysObject = gateways.map((gateway) => {
        return new Gateway(
          gateway.id,
          gateway.status,
          new Date(gateway.lastPinged),
          gateway.devices.map((sensor) => {
            return new Sensor(
              sensor.id,
              sensor.status,
              new Date(sensor.lastPinged)
            );
          })
        );
      });
      //nie zakladam ze gateway moze miec gateway pod soba
      //w takim wypadku ide po kazdym gatewayu i sprawdzam czy kazde z jego device to jest gateway
      //i znowu w srodku patrze czy sa sensory czy kolejny gateway
      const sensors = device.devices.filter((device) => {
        return device.deviceType.toString() === deviceType[deviceType.sensor];
      });
      const sensorsObject = sensors.map((sensor) => {
        return new Sensor(
          sensor.id,
          sensor.status,
          new Date(sensor.lastPinged)
        );
      });
      bridges.push(
        new Bridge(
          device.id,
          device.status,
          new Date(device.status),
          gatewaysObject
        )
      );
    }
    //zakladam ze pod gatewayem nie ma gatewayów
    else if (device.deviceType.toString() === deviceType[deviceType.gateway]) {
        gateways.push(new Gateway(device.id, device.status, new Date(device.lastPinged), device.devices.map(device => {
          return new Sensor(
            device.id,
            device.status,
            new Date(device.lastPinged)
          );
        })))
    }
  });
  return new DeviceModel(bridges, gateways)
};

export class DeviceModel implements IDeviceModel {
  bridges: Bridge[];
  gateways: Gateway[];

  constructor(bridges?: Bridge[], gateways?: Gateway[]) {
    this.bridges = bridges ?? [];
    this.gateways = gateways ?? [];
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

  return new DeviceModel(bridges, gateways);
}
