import {
  Box,
  VStack,
  Grid,
  HStack,
  IconButton,
  Text,
  Heading,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { IHistoryChartData } from "../../../types/IHistoryChartData";
import { IHistoryValue } from "../../../types/IHistoryValues";

const getColor = (activePercent: number): string => {
  return activePercent > 40.8 ? "green.400" : "red.400";
};

const groupByMonth = (
  data: IHistoryValue[]
): Record<string, IHistoryValue[]> => {
  return data.reduce((acc: Record<string, IHistoryValue[]>, day) => {
    const month = new Date(day.timestamp).toLocaleString("en-PL", {
      month: "long",
    });
    if (!acc[month]) acc[month] = [];
    acc[month].push(day);
    return acc;
  }, {});
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function isLastDayOfMonth(date: Date): boolean {
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  return nextDay.getDate() === 1;
}

const CalendarMonth = ({
  monthName,
  days,
}: {
  monthName: string;
  days: IHistoryValue[];
}) => {
  const getDaysComponents = (days: IHistoryValue[]): JSX.Element[] => {
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
          w="40px"
          h="40px"
          bg={getColor(day.active)}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          onClick={() => {
            console.log(date);
          }}
        >
          <Text fontSize="md" color="white">
            {date.getDate()}
          </Text>
        </Box>
      );
      if (!isLastDayOfMonth(date) && index === days.length - 1) {
        let i = 1;
        while (true) {
          const newDate = new Date(date);
          newDate.setDate(date.getDate() + i);
          i += 1;
          dayComponents.push(
            <Box
              key={(Math.random() + 1).toString(36).substring(7).toString()}
              w="40px"
              h="40px"
              bg="gray"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
            >
              <Text fontSize="md" color="white">
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

  const getAverageOfMonth = (days: IHistoryValue[]): string => {
    if (days.length === 0) return '0';
    const totalActive = days.reduce((sum, day) => sum + day.active, 0);
    const averageActive = totalActive / days.length;
    return averageActive.toFixed(2);
  };

  return (
    <VStack align="stretch">
      <HStack align="center" justifyContent="space-between">
        <Text fontSize="lg" fontWeight="bold">
          {monthName}
        </Text>
        <Text color="gray" fontSize="sm">
          {getAverageOfMonth(days)}%
        </Text>
      </HStack>
      <Grid templateColumns="repeat(7, 1fr)" gap={1}>
        {getDaysComponents(days)}
      </Grid>
    </VStack>
  );
};

export const CalendarHeatmap = ({
  chartData,
}: {
  chartData: IHistoryValue[];
}) => {
  const groupedData = useMemo(() => groupByMonth(chartData), [chartData]);
  const months = Object.keys(groupedData);
  const [startIndex, setStartIndex] = useState(Math.max(0, months.length - 3));

  const showNextMonths = () => {
    setStartIndex((prev) => Math.min(prev + 1, months.length - 3));
  };

  const showPreviousMonths = () => {
    setStartIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <VStack spacing={12} align="stretch">
      <HStack width="100%" justifyContent="space-between">
        <IconButton
          aria-label="Previous months"
          icon={<ChevronLeft />}
          onClick={showPreviousMonths}
          isDisabled={startIndex === 0}
        />
        <Heading size="lg">Calendar Heatmap</Heading>
        <IconButton
          aria-label="Next months"
          icon={<ChevronRight />}
          onClick={showNextMonths}
          isDisabled={startIndex >= months.length - 3}
          color="primary"
        />
      </HStack>
      <HStack spacing={20} align="stretch">
        {months.slice(startIndex, startIndex + 3).map((month) => (
          <CalendarMonth
            key={month}
            monthName={month}
            days={groupedData[month]}
          />
        ))}
      </HStack>
    </VStack>
  );
};
