import { IMonitoringDevice, deviceStatus } from "../../../types/deviceModel";

interface PieChartData {
	name: string;
    value: number;
}

export const getDevicesStatusPieChartData = (
  devices: IMonitoringDevice[]
): PieChartData[] => {
  const statusArray = devices.map((device) => {
    return device.status;
  });
  const disabledDevicesCount = statusArray.filter(
    (status) => status === deviceStatus.disabled
  ).length;
  return [
    {
      name: "disabled",
      value: disabledDevicesCount,
    },
    {
      name: "enabled",
      value: statusArray.length - disabledDevicesCount,
    },
  ];
};

export const getDevicesHistoryPieChartData = (
  devices: IMonitoringDevice[]
): PieChartData[] => {
  const statusArray = devices.map((device) => {
    return device.status;
  });
  const pecrentageArray = statusArray.map((status) => {
    return Math.floor(status);
  });

  const Lessthan90 = pecrentageArray.filter(
  (status) => status < 90
  ).length;
  const Between90and95 = pecrentageArray.filter(
    (status) => status >= 90 && status<95
    ).length;
  const Atleast95 = pecrentageArray.filter(
    (status) => status >= 95
    ).length;

  
  

  return [
    {
      name: "Lessthan90",
      value: Lessthan90,
    },
    {
      name: "Between90and95",
      value: Between90and95,
    },
    {
      name: "Atleast95",
      value: Atleast95,
    },
  ];
};
