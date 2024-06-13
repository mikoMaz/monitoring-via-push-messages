import { Box, Center, HStack } from "@chakra-ui/react";
import { appProps } from "../../config/config";
import { useEffect, useState } from "react";
import { DeviceModel } from "../../types/deviceModel";
import { APIClient } from "../../api/api-client";
import { StatusPieChart } from "./components/status-pie-chart";
import { HistoryPieChart } from "./components/history-pie-chart";
export const DashboardPage = () => {
  const ui = appProps.appMainProps.ui;

  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel()
  );

  useEffect(() => {
    const fetchData = async () => {
      const data: DeviceModel = await APIClient.getUpdatedDeviceModel();
      setDeviceModel(data);
    };

    fetchData();
  }, []);
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={ui.colors.background}
      boxShadow="inner"
    >
      <Center>
        <HStack>
          <StatusPieChart devices={deviceModel.getSensorsArray()} heading="Sensors" />
          <StatusPieChart devices={deviceModel.getGatewaysArray()} heading="Gateways"/>
          <StatusPieChart devices={deviceModel.getBridgesArray()} heading="Bridges"/>
        </HStack>
        <HStack>
          <HistoryPieChart devices={deviceModel.getSensorsArray()} heading="Sensors" />
          <HistoryPieChart devices={deviceModel.getGatewaysArray()} heading="Gateways"/>
          <HistoryPieChart devices={deviceModel.getBridgesArray()} heading="Bridges"/>
        </HStack>
      </Center>
    </Box>
  );
};
