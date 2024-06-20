import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IMonitoringDevice } from "../../../types/deviceModel";
import { getDevicesStatusPieChartData } from "../util/dashboard-page-util";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";

interface IRecentChart {
  devices: number[];
}


export const RecentChart = ({ devices }: IRecentChart) => {

function generateProgressList(numbers: any[]) {
    const length = numbers.length;
    if (length === 0) {
        return [];
    }
    const step = 100 / (length - 1);
    const progressList = numbers.map((num, index) => index * step);
    return progressList;
}

const percentList = generateProgressList(devices);

  const getChartData = () => {
    return devices.map((device, index) => {
      return { name: percentList[index], number: device };
    });
  };

  return (
    <Box padding="50px">
      <BarChart
        width={1200}
        height={400}
        data={getChartData()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <YAxis dataKey="number" />
        <XAxis dataKey="name" />
        <Bar
          dataKey="number"
          fill={UIProps.colors.secondary}
          label={{ position: "top" }}
        />
      </BarChart>
    </Box>
  );
};
