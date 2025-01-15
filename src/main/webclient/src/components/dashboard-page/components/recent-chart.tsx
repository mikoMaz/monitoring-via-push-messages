import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { Box, VStack } from "@chakra-ui/react";
import {Tooltip as ChakraTooltip} from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { getDensityRecentChart } from "../util/density-devices-recent";
import { IChartTemplateModelDrawing } from "../../../types/chartTemplate";
import { InfoOutlined } from "@mui/icons-material";

interface CustomTooltipPayload {
  min: number;
  max: number;
  number: number;
}

const getDescOfPage = (
  payload: string | undefined,
  min: number,
  max: number
) => {
  if (payload === "1") {
    return `${payload} device in range ${min}% - ${max}%`;
  }
  return `${payload} devices in range ${min}% - ${max}%`;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const { min, max } = payload[0].payload as CustomTooltipPayload;
    return (
      <div
        style={{
          border: "1px solid grey",
          padding: "0px 10px",
          background: UIProps.colors.background,
        }}
      >
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="desc" style={{ fontWeight: "bold" }}>
          {getDescOfPage(payload[0].value?.toString(), min, max)}
        </p>
      </div>
    );
  }

  return <></>;
};

export const RecentChart = ({
  devicesHistoryValues,
  percentFragmentation,
  brushActive,
}: IChartTemplateModelDrawing) => {
  const chartData = getDensityRecentChart(
    devicesHistoryValues,
    percentFragmentation
  ).elements.map((device) => {
    if (device.maxPercentActivityRangePoint > 100) {
      device.maxPercentActivityRangePoint = 100;
    }
    if (device.minPercentActivityRangePoint < 0) {
      device.minPercentActivityRangePoint = 0;
    }
    if (!Number.isInteger(device.minPercentActivityRangePoint)) {
      device.minPercentActivityRangePoint = parseFloat(
        device.minPercentActivityRangePoint.toFixed(2)
      );
    }
    if (!Number.isInteger(device.maxPercentActivityRangePoint)) {
      device.maxPercentActivityRangePoint = parseFloat(
        device.maxPercentActivityRangePoint.toFixed(2)
      );
    }

    return {
      min: device.minPercentActivityRangePoint,
      max: device.maxPercentActivityRangePoint,
      name: `${device.minPercentActivityRangePoint} - ${device.maxPercentActivityRangePoint}`,
      number: device.devices.length,
    };
  });

  if (devicesHistoryValues && devicesHistoryValues.length) {
    console.log(brushActive);
    return (
      <Box>
        <VStack spacing={1} align="end">
        <BarChart
          width={1200}
          height={500}
          data={chartData}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" />
          <YAxis dataKey="number" />
          <XAxis dataKey="name" />
          {brushActive && (
            <Brush dataKey="max" height={30} stroke={UIProps.colors.primary} />
          )}
          <Bar dataKey="number" barSize={40} fill={UIProps.colors.secondary} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
          />
        </BarChart>
        <ChakraTooltip label="Chart showing device counts by percentage range of operation during their entire activity" bg="gray.100" color="gray.500" placement="left">
          <InfoOutlined style={{ color: UIProps.colors.accent, fontSize: "32px" }} />
        </ChakraTooltip>
        </VStack>
        
      </Box>
    );
  } else {
    return <>Invalid data</>;
  }
};
