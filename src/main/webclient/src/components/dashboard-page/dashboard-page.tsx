import { Box, Center, HStack } from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { StatusPieChart } from "./components/status-pie-chart";
import { UIProps } from "../../config/config";

export const DashboardPage = (model: DeviceModel) => {
  const ui = UIProps;
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={ui.colors.background}
      boxShadow="inner"
    >
      <Center>
        <HStack>
          <StatusPieChart devices={model.getSensorsArray()} heading="Sensors" />
          <StatusPieChart
            devices={model.getGatewaysArray()}
            heading="Gateways"
          />
          <StatusPieChart devices={model.getBridgesArray()} heading="Bridges" />
        </HStack>
      </Center>
    </Box>
  );
};
