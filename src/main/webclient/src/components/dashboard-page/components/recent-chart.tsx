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
import { Box } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { getDensityRecentChart } from "../util/density-devices-recent";

interface IRecentChart {
  devices: number[];
}

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

  return null;
};

export const RecentChart = ({ devices }: IRecentChart) => {
  const chartData = getDensityRecentChart(devices, 0.5).elements.map(
    (device) => {
      return {
        min: device.minPercentActivityRangePoint,
        max: device.maxPercentActivityRangePoint,
        name: `${device.minPercentActivityRangePoint} - ${device.maxPercentActivityRangePoint}`,
        number: device.devices.length,
      };
    }
  );

  if (devices.length) {
    return (
      <Box padding="100px">
        <BarChart
          width={1200}
          height={500}
          data={chartData} // U�ycie zmiennej
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
          <Brush dataKey="max" height={30} stroke={UIProps.colors.primary} />
          <Bar
            dataKey="number"
            barSize={40}
            fill={UIProps.colors.secondary}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
          />
        </BarChart>
      </Box>
    );
  } else {
    return <>No data</>;
  }
};
