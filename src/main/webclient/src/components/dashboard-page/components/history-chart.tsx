import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { APIClient } from "../../../api/api-client";
import { IHistoryChartData } from "../../../types/IHistoryChartData";
import { IChartTemplateModelDrawing } from "../../../types/chartTemplate";
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";
import { IHistoryValue } from "../../../types/IHistoryValues";

interface IHistoryChart extends IChartTemplateModelDrawing {
  apiClient: APIClient;
  accessToken: string;
  companyId: number | undefined;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box bg="white" p={2} borderRadius="md" boxShadow="lg" padding={4}>
        <Text as="b" fontSize="lg">{`${payload[0].payload.timestamp}`}</Text>
        <Text color="green">{`active : ${payload[0].payload.active}%`}</Text>
        {/* <Text color="orange">{`disabled : ${payload[0].payload.disabledPercent}%`}</Text> */}
        <Text color="red">{`inactive : ${payload[0].payload.disabled}%`}</Text>
      </Box>
    );
  }

  return null;
};

export const HistoryBatteryChart = ({
  chartData,
  isPreview,
  dateOnClickOperation,
}: {
  chartData: IHistoryValue[];
  isPreview: boolean; //enables operations on-click for preview page
  dateOnClickOperation?: CategoricalChartFunc;
}) => {
  return (
    <Box width="100%" height="250px" display="flex" alignItems="center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={
            !isPreview
              ? {
                  top: 20,
                  right: 30,
                  left: 30,
                  bottom: 20,
                }
              : {}
          }
          onClick={dateOnClickOperation}
        >
          <Bar dataKey="active" stackId="a" fill="green" />
          {/* <Bar dataKey="inactive" stackId="a" fill="orange" /> */}
          <Bar dataKey="disabled" stackId="a" fill="red" />
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
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
  const [chartData, setChartData] = useState<IHistoryValue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        if (companyId === undefined) {
          throw new Error("CompanyId is undefined.");
        }
        const data = await apiClient.getHistoryValues(
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

  return <HistoryBatteryChart chartData={chartData} isPreview={false} />;
};
