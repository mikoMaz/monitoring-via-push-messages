import { HStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { IChartTemplateModelDrawing } from "../../../types/chartTemplate";
import { createDeviceModel, deviceType } from "../../../types/deviceModel";

export const CurrentChart = ({
  model,
  deviceTypes,
}: IChartTemplateModelDrawing & { deviceTypes: number[] }) => {
  const deviceModel = createDeviceModel(model);

  if (model.getDevicesCount()) {
    return (
      <HStack>
        {deviceTypes.includes(deviceType.sensor) && (
          <StatusPieChart
            devices={deviceModel.getSensorsArray()}
            heading="Sensors"
          />
        )}
        {deviceTypes.includes(deviceType.gateway) && (
          <StatusPieChart
            devices={deviceModel.getGatewaysArray()}
            heading="Gateways"
          />
        )}
        {deviceTypes.includes(deviceType.bridge) && (
          <StatusPieChart
            devices={deviceModel.getBridgesArray()}
            heading="Bridges"
          />
        )}
      </HStack>
    );
  } else {
    return <>Invalid data</>;
  }
};
