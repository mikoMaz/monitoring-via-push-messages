import { Bar, BarChart, Cell, Pie, PieChart, Tooltip } from "recharts";
import { IMonitoringDevice } from "../../../types/deviceModel";
import { getDevicesStatusPieChartData } from "../util/dashboard-page-util";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";

interface IRecentChart {
  devices: number[];
}

export const RecentChart = ({ devices }: IRecentChart) => {
  const colors: { [id: string]: string } = {
    disabled: UIProps.colors.charts.disabled,
    enabled: UIProps.colors.charts.active,
  };

  const getChartData = () => {
    return devices.map((device) => {
      return { name: device };
    });
  };

  return (
    <Box padding="50px">
      <VStack>
        <Heading>Title</Heading>
        <BarChart width={150} height={40} data={getChartData()}>
          <Bar dataKey="name" fill="#8884d8" />
        </BarChart>
      </VStack>
    </Box>
  );
};
