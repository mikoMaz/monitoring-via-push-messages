import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { APIClient } from "../../../api/api-client";
import { IHistoryChartData } from "../../../types/IHistoryChartData";
import { IChartTemplateModelDrawing } from "../../../types/chartTemplate";

export const HistoryChart = ({
  dateFrom,
  dateTo,
}: IChartTemplateModelDrawing) => {
  const apiClient = new APIClient();

  const [chartData, setChartData] = useState<IHistoryChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const data = await apiClient.getDataHistoryChart(
          dateFrom,
          dateTo
        );
        setChartData(data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych wykresu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [dateFrom, dateTo]);

  if (loading) {
    return <Box>Ładowanie danych...</Box>;
  }

  return (
    <Box width="100%" height="500px">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={chartData}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
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
