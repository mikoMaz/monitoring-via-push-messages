export enum deviceStatus {
  active,
  disabled,
}

export enum deviceType {
	sensor,
	gateway,
	bridge
}

export interface IMonitoringDevice {
  id: string;
  status: deviceStatus;
  lastPinged: Date;
  deviceType: deviceType;
}

export class Sensor implements IMonitoringDevice {
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

export class Gateway implements IMonitoringDevice {
	id: string;
	status: deviceStatus;
	lastPinged: Date;
	deviceType: deviceType;
	sensors: Sensor[];
  
	constructor(id: string, status: deviceStatus, lastPinged: Date, sensors: Sensor[]) {
	  this.id = id;
	  this.status = status;
	  this.lastPinged = lastPinged;
	  this.deviceType = deviceType.gateway;
	  this.sensors = sensors;
	}
}

export class Bridge implements IMonitoringDevice {
	id: string;
	status: deviceStatus;
	lastPinged: Date;
	deviceType: deviceType;
	gateways: Gateway[];
  
	constructor(id: string, status: deviceStatus, lastPinged: Date, gateways: Gateway[]) {
	  this.id = id;
	  this.status = status;
	  this.lastPinged = lastPinged;
	  this.deviceType = deviceType.bridge;
	  this.gateways = gateways;
	}
}

export class DeviceModel {
  bridges: Bridge[];
  gateways: Gateway[];
  sensors: Sensor[];

  constructor(bridges?: Bridge[], gateways?: Gateway[], sensors?: Sensor[]) {
    this.bridges = bridges ?? [];
	this.gateways = gateways ?? [];
	this.sensors = sensors ?? [];
  }
}
