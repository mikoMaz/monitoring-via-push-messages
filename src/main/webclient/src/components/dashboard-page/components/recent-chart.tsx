import { Bar, BarChart, Brush, XAxis, YAxis } from "recharts";
import { Box } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { getDensityRecentChart } from "../util/density-devices-recent";

interface IRecentChart {
  devices: number[];
}

export const RecentChart = ({ devices }: IRecentChart) => {
  const getChartData = () => {
    return getDensityRecentChart(devices, 0.5).elements.map((device) => {
      return {
        name: device.maxPercentActivityRangePoint,
        number: device.numElements.length,
      };
    });
  };

  return (
    <Box padding="100px">
      <BarChart
        width={1200}
        height={500}
        data={getChartData()}
        margin={{
          top: 50,
          right: 10,
          left: 10,
          bottom: 50,
        }}
      >
        <YAxis dataKey="number" />
        <XAxis dataKey="name" />
        <Brush dataKey="name" height={30} stroke={UIProps.colors.primary} />
        <Bar
          dataKey="number"
          fill={UIProps.colors.secondary}
          label={{ position: "top" }}
          background={{ fill: UIProps.colors.charts.background }}
        />
      </BarChart>
    </Box>
  );
};
