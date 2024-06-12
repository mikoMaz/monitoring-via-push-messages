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
