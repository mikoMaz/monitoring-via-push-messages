import { HStack, Tooltip, VStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { IChartTemplateModelDrawing } from "../../../types/chartTemplate";
import { createDeviceModel, deviceType } from "../../../types/deviceModel";
import { InfoOutlined } from "@mui/icons-material";
import { UIProps } from "../../../config/config";

export const CurrentChart = ({
  model,
  deviceTypes,
}: IChartTemplateModelDrawing & { deviceTypes: number[] }) => {
  const deviceModel = createDeviceModel(model);

  if (model.getDevicesCount()) {
    return (
      <VStack spacing={1} align="end">
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
        <Tooltip label="Chart that displays current status of the devices in a company" bg="gray.100" color="gray.500" placement="left">
          <InfoOutlined style={{ color: UIProps.colors.accent, fontSize: "32px" }} />
        </Tooltip>
      </VStack>
    );
  } else {
    return <>Invalid data</>;
  }
};
