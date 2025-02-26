import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
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

export const HistoryBatteryChart = ({
  chartData,
}: {
  chartData: IHistoryChartData[];
  isPreview: boolean; //enables operations on-click for preview page
  dateOnClickOperation?: () => void;
}) => {
  return (
    <Box width="100%" height="250px" display="flex" alignItems="center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={500}
          // height={100}
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="timestamp" />
          <Bar dataKey="active" stackId="a" fill="green" />
          <Bar dataKey="disabled" stackId="a" fill="orange" />
          <Bar dataKey="inactive" stackId="a" fill="red" />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
      {/* <ResponsiveContainer width="100%" height="100%">
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
    </ResponsiveContainer> */}
    </Box>
  );
};

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
          throw new Error("CompanyId is undefined.");
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

  return <HistoryBatteryChart chartData={chartData} isPreview={false}/>;
};
