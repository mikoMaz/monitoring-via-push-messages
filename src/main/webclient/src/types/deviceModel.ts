export enum deviceStatus {
  active,
  disabled,
}

export interface IMonitoringDevice {
  id: string;
  status: deviceStatus;
  lastPinged: Date;
}

export class Sensor implements IMonitoringDevice {
  id: string;
  status: deviceStatus;
  lastPinged: Date;

  constructor(id: string, status: deviceStatus, lastPinged: Date) {
    this.id = id;
    this.status = status;
	this.lastPinged = lastPinged;
  }
}

export class Gateway implements IMonitoringDevice {
	id: string;
	status: deviceStatus;
	lastPinged: Date;
  
	constructor(id: string, status: deviceStatus, lastPinged: Date) {
	  this.id = id;
	  this.status = status;
	  this.lastPinged = lastPinged;
	}
}

export class Bridge implements IMonitoringDevice {
	id: string;
	status: deviceStatus;
	lastPinged: Date;
  
	constructor(id: string, status: deviceStatus, lastPinged: Date) {
	  this.id = id;
	  this.status = status;
	  this.lastPinged = lastPinged;
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
