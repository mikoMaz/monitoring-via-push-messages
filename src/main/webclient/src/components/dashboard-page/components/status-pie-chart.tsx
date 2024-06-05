import { Cell, Pie, PieChart } from "recharts";
import { IMonitoringDevice } from "../../../types/deviceModel";
import { getDevicesStatusPieChartData } from "../util/dashboard-page-util";
import { theme } from "@chakra-ui/react";

interface IStatusPieChart {
  devices: IMonitoringDevice[];
}

export const StatusPieChart = ({ devices }: IStatusPieChart) => {
  const colors: { [id: string]: string } = {
    disabled: theme.colors.red[200],
    enabled: theme.colors.green[200],
  };
  let chartData = getDevicesStatusPieChartData(devices);

  return (
    <PieChart width={300} height={300}>
      <Pie dataKey="value" fill="white" data={chartData}>
        {chartData.map((data, index) => {
          return <Cell key={`cell-${index}`} fill={colors[data.name]} />;
        })}
      </Pie>
    </PieChart>
  );
};
