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

interface IHistoryChart {
  dateFrom?: string;
  dateTo?: string;
}

export const HistoryChart = ({ dateFrom, dateTo }: IHistoryChart) => {
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const defaultDateFrom = formatDate(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const defaultDateTo = formatDate(new Date());

  const apiClient = new APIClient();

  const [chartData, setChartData] = useState<IHistoryChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const data = await apiClient.getDataHistoryChart(
          dateFrom || defaultDateFrom,
          dateTo || defaultDateTo
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
