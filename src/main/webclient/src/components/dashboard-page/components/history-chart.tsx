import { Box } from "@chakra-ui/react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const HistoryChart = () => {
  const chartData = [
    {
      timestamp: "26.10",
      active: 90,
      inactive: 1,
      disabled: 9,
    },
    {
      timestamp: "27.10",
      active: 80,
      inactive: 5,
      disabled: 15,
    },
    {
      timestamp: "28.10",
      active: 90,
      inactive: 1,
      disabled: 9,
    },
    {
      timestamp: "29.10",
      active: 80,
      inactive: 5,
      disabled: 15,
    },
    {
      timestamp: "30.10",
      active: 90,
      inactive: 1,
      disabled: 9,
    },
    {
      timestamp: "31.10",
      active: 80,
      inactive: 5,
      disabled: 15,
    },
  ];

  return (
    <Box width="100%" height="500px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="active"
            stroke="green"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="inactive" stroke="red" />
          <Line type="monotone" dataKey="disabled" stroke="orange" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
