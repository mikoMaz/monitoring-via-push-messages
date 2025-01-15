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

interface IHistoryChart extends IChartTemplateModelDrawing {
  apiClient: APIClient;
  accessToken: string;
  companyId: number | undefined;
}

export const HistoryChart = ({
  apiClient,
  accessToken,
  companyId,
  dateFrom,
  dateTo,
}: IHistoryChart) => {
  const [chartData, setChartData] = useState<IHistoryChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        if (companyId === undefined) {
          throw new Error("CompanyId is undefined.")
        }
        const data = await apiClient.getDataHistoryChart(
          accessToken,
          companyId,
          dateFrom,
          dateTo
        );
        setChartData(data);
      } catch (error) {
        console.error("Błąd podczas pobierania danych wykresu:", error);
        setChartData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchChartData();
  }, [dateFrom, dateTo, companyId, apiClient, accessToken]);

  if (loading) {
    return <Box>Authentication in progress...</Box>;
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
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
