import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { IMonitoringDevice } from "../../../types/deviceModel";
import { getDevicesStatusPieChartData } from "../util/dashboard-page-util";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";

interface IStatusPieChart {
  devices: IMonitoringDevice[];
  heading: string;
}

export const StatusPieChart = ({ devices, heading }: IStatusPieChart) => {
  const colors: { [id: string]: string } = {
    disabled: UIProps.colors.charts.disabled,
    enabled: UIProps.colors.charts.active,
  };
  const chartData = getDevicesStatusPieChartData(devices);

  const totalDevices = chartData.reduce((acc, data) => acc + data.value, 0);

  const formatter = (value: number | string) => {
    if (typeof value === "number") {
      return `${((value / totalDevices) * 100).toFixed(2)}%`;
    }
    return value;
  };

  return (
    <Box padding="50px">
      <VStack>
        <Heading>{heading}</Heading>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            fill="white"
            data={chartData}
            label
          >
            {chartData.map((data, index) => (
              <Cell key={`cell-${index}`} fill={colors[data.name]} />
            ))}
          </Pie>
          <Tooltip formatter={formatter} />
        </PieChart>
      </VStack>
    </Box>
  );
};
