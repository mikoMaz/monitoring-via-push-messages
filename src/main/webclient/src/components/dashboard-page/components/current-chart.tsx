import { HStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { DeviceModel } from "../../../types/deviceModel";

interface ICurrentChart {
  model: DeviceModel;
}

export const CurrentChart = ({ model }: ICurrentChart) => {
  return (
    <HStack>
      <StatusPieChart devices={model.getSensorsArray()} heading="Sensors" />
      <StatusPieChart devices={model.getGatewaysArray()} heading="Gateways" />
      <StatusPieChart devices={model.getBridgesArray()} heading="Bridges" />
    </HStack>
  );
};
