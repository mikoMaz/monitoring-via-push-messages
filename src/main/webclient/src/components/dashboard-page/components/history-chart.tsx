import { Box, Grid, HStack, Text, VStack } from "@chakra-ui/react";
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
import { CategoricalChartFunc } from "recharts/types/chart/generateCategoricalChart";

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
        <Text color="green">{`active : ${payload[0].payload.activePercent}%`}</Text>
        <Text color="orange">{`disabled : ${payload[0].payload.disabledPercent}%`}</Text>
        <Text color="red">{`inactive : ${payload[0].payload.inactivePercent}%`}</Text>
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
  chartData: IHistoryChartData[];
  isPreview: boolean; //enables operations on-click for preview page
  dateOnClickOperation?: CategoricalChartFunc;
}) => {
  return (
    <Box width="100%" height="250px" display="flex" alignItems="center">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          // width={500}
          // height={100}
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
          {/* <XAxis dataKey="timestamp" /> */}
          <Bar dataKey="active" stackId="a" fill="green" />
          <Bar dataKey="disabled" stackId="a" fill="orange" />
          <Bar dataKey="inactive" stackId="a" fill="red" />
          <Tooltip content={<CustomTooltip />} />
          {/* <Tooltip /> */}
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

const getColor = (activePercent: number): string => {
  return activePercent > 40.8 ? "green.400" : "red.400";
};

const groupByMonth = (
  data: IHistoryChartData[]
): Record<string, IHistoryChartData[]> => {
  return data.reduce((acc: Record<string, IHistoryChartData[]>, day) => {
    const month = new Date(day.timestamp).toLocaleString("en-PL", {
      month: "long",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(day);
    return acc;
  }, {});
};

// const getWeekStartDate = (date: Date): Date => {
//   const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ...
//   // console.log(dayOfWeek, date);
//   const diff = (dayOfWeek + 6) % 7; // To make Monday the first day of the week
//   // console.log(diff, date);
//   date.setDate(date.getDate() - diff); // Adjust to the start of the week (Monday)
//   // console.log(date);
//   return date;
// };
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function isLastDayOfMonth(date: Date): boolean {
  const nextDay = new Date(date);
  nextDay.setMonth(date.getMonth() + 1); //przyszły miesiac
  nextDay.setDate(0); //ostatni dzień poprzedniego miesiąca
  return date.getDate() === nextDay.getDate();
}

const CalendarMonth = ({
  monthName,
  days,
}: {
  monthName: string;
  days: IHistoryChartData[];
}) => {
  const getDaysComponents = (days: IHistoryChartData[]): JSX.Element[] => {
    const dayComponents: JSX.Element[] = [];
    days.forEach((day, index) => {
      const date = new Date(day.timestamp);
      if (date.getDate() === 1) {
        weekDays.every((dayName) => {
          if (dayName === date.toString().split(" ")[0]) {
            return false;
          } else {
            dayComponents.push(
              <Box
                key={(Math.random() + 1).toString(36).substring(7).toString()}
              />
            );
            return true;
          }
        });
      }
      dayComponents.push(
        <Box
          key={day.timestamp}
          w="20px"
          h="20px"
          bg={getColor(day.activePercent)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          onClick={() => {
            console.log(date);
          }}
        >
          <Text fontSize="xs" color="white">
            {date.getDate()}
          </Text>
        </Box>
      );
      console.log("new date", new Date(2025, 0, 31));
      console.log("new date of date ", new Date(date));
      if (new Date(date) === new Date(2025, 0, 31)) {
        console.log("checking if 31.01.2025 is last day of month: ", isLastDayOfMonth(date));
      }
      if (!isLastDayOfMonth(date) && index === days.length - 1) {
        console.log("date: ", date.toString());
        console.log("is date last day of month? ", isLastDayOfMonth(date));
        console.log("is index last day of this month? ", index === days.length - 1);
        let i = 1;
        while (true) {
          const newDate = new Date(date);
          newDate.setDate(date.getDate() + i);
          i += 1;
          dayComponents.push(
            <Box
              key={(Math.random() + 1).toString(36).substring(7).toString()}
              w="20px"
              h="20px"
              bg="gray"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              onClick={() => {
                console.log(newDate);
              }}
            >
              <Text fontSize="xs" color="white">
                {newDate.getDate()}
              </Text>
            </Box>
          );
          if (isLastDayOfMonth(newDate)) {
            break;
          }
        }
      }
    });
    return dayComponents;
  };

  return (
    <VStack align="stretch">
      <Text fontSize="lg" fontWeight="bold">
        {monthName}
      </Text>
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {getDaysComponents(days)}
      </Grid>
    </VStack>
  );
};

const CalendarHeatmap = ({ chartData }: { chartData: IHistoryChartData[] }) => {
  const [groupedData] = useState(groupByMonth(chartData));
  // const groupedData = groupByMonth(chartData);

  return (
    <HStack spacing={4} align="stretch">
      {Object.entries(groupedData).map(([month, days]) => (
        <CalendarMonth key={month} monthName={month} days={days} />
      ))}
    </HStack>
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

  return <CalendarHeatmap chartData={chartData} />;
  // return <HistoryBatteryChart chartData={chartData} isPreview={false} />;
};
