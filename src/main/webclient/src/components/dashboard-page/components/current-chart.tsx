import { HStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { IChartTemplateModelDrawing } from "../../../types/chartTemplate";
import { createDeviceModel } from "../../../types/deviceModel";

export const CurrentChart = ({
  model,
  devicesHistoryValues,
  deviceTypes,
}: IChartTemplateModelDrawing & { deviceTypes: number[] }) => {
  const deviceModel = createDeviceModel(model);

  if (devicesHistoryValues.length) {
    return (
      <HStack>
        {deviceTypes.includes(0) && (
          <StatusPieChart
            devices={deviceModel.getSensorsArray()}
            heading="Sensors"
          />
        )}
        {deviceTypes.includes(1) && (
          <StatusPieChart
            devices={deviceModel.getGatewaysArray()}
            heading="Gateways"
          />
        )}
        {deviceTypes.includes(2) && (
          <StatusPieChart
            devices={deviceModel.getBridgesArray()}
            heading="Bridges"
          />
        )}
      </HStack>
    );
  } else {
    return <>No data</>;
  }
};
