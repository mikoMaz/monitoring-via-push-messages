import { Box } from "@chakra-ui/react";
import { red } from "@mui/material/colors";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
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
      name: "January 1",
      green: 40,
      red: 35,
      yellow: 25,
    },
    {
      name: "January 2",
      green: 50,
      red: 30,
      yellow: 20,
    },
    {
      name: "January 3",
      green: 60,
      red: 25,
      yellow: 15,
    },
    {
      name: "January 4",
      green: 30,
      red: 40,
      yellow: 30,
    },
    {
      name: "January 5",
      green: 20,
      red: 50,
      yellow: 30,
    },
    {
      name: "January 6",
      green: 35,
      red: 45,
      yellow: 20,
    },
    {
      name: "January 7",
      green: 55,
      red: 30,
      yellow: 15,
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="green"
            stroke="green"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="red" stroke="red" />
          <Line type="monotone" dataKey="yellow" stroke="orange" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
