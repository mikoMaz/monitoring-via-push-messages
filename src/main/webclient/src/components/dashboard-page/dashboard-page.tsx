import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Tooltip as ChakraTooltip } from "@chakra-ui/react";
import {
  AllDevicesUptimeJson,
  DeviceModel,
  returnDevicesArrayFromAllDevicesUptimeJson,
} from "../../types/deviceModel";
import { UIProps } from "../../config/config";
import { useState } from "react";
import { ViewChartsTabs } from "./components/view-charts-tabs";
import { RecentChart } from "./components/recent-chart";
import { CurrentChart } from "./components/current-chart";
import { CustomChartsTab } from "./components/custom-charts-tab";
import { getEmptyPreset, IChartTemplateModel } from "../../types/chartTemplate";
import { HistoryChart } from "./components/history-chart";
import { APIClient } from "../../api/api-client";
import { InfoOutlined } from "@mui/icons-material";

enum viewOption {
  current,
  recent,
  recentHistory,
  custom,
}

interface IDashboardPage {
  apiClient: APIClient;
  accessToken: string;
  companyId: number | undefined;
  model: DeviceModel;
  devicesUptime: AllDevicesUptimeJson;
}

export const DashboardPage = ({
  apiClient,
  accessToken,
  companyId,
  model,
  devicesUptime,
}: IDashboardPage) => {
  const [selectedViewOption, setSelectedViewOption] = useState<viewOption>(
    viewOption.current
  );
  const currentTime = new Date().toLocaleString();

  const allHistoryValues =
    returnDevicesArrayFromAllDevicesUptimeJson(devicesUptime);

  const chartModel: IChartTemplateModel = getEmptyPreset().chartModel;

  const onSelectedViewChanged = (index: number) => {
    switch (index) {
      case 0:
        setSelectedViewOption(viewOption.current);
        break;
      case 1:
        setSelectedViewOption(viewOption.recent);
        break;
      case 2:
        setSelectedViewOption(viewOption.recentHistory);
        break;
      case 3:
        setSelectedViewOption(viewOption.custom);
        break;
      default:
        console.error("Out of memory index");
    }
  };

  const renderSelectedView = () => {
    switch (selectedViewOption) {
      case viewOption.current:
        return (
          <Stack marginBottom={4}>
            <Center>
              <CurrentChart
                model={model}
                devicesHistoryValues={allHistoryValues}
                {...chartModel}
              />
            </Center>
            <Text>Generated: {currentTime}</Text>
          </Stack>
        );
      case viewOption.recent:
        return (
          <Stack marginBottom={4}>
            <Center>
              <RecentChart
                model={model}
                devicesHistoryValues={allHistoryValues}
                {...chartModel}
              />
            </Center>
            <Text>Generated: {currentTime}</Text>
          </Stack>
        );
      case viewOption.recentHistory:
        return (
          <Stack marginBottom={4}>
            <Center>
            <HistoryChart
                  apiClient={apiClient}
                  accessToken={accessToken}
                  companyId={companyId}
                  model={model}
                  devicesHistoryValues={allHistoryValues}
                  {...chartModel}
                />
            </Center>

            <HStack justifyContent="space-between">
              <Text>Generated: {currentTime}</Text>
              <ChakraTooltip
                label="Chart showing how many devices were active everyday in a given period of time"
                bg="gray.100"
                color="gray.500"
                placement="left"
              >
                <InfoOutlined
                  style={{ color: UIProps.colors.accent, fontSize: "32px" }}
                />
              </ChakraTooltip>
            </HStack>
          </Stack>
        );
      case viewOption.custom:
        return (
          <CustomChartsTab
            model={model}
            devicesUptime={devicesUptime}
            apiClient={apiClient}
            accessToken={accessToken}
            companyId={companyId}
          />
        );
    }
  };

  const ui = UIProps;
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={ui.colors.background}
      boxShadow="inner"
    >
      <Grid>
        <GridItem
          className="control-panel-buttons"
          marginTop="10px"
          marginBottom="28px"
        ></GridItem>
        <Grid templateColumns="4fr 7fr">
          <GridItem marginBottom="30px">
            <ViewChartsTabs
              index={selectedViewOption}
              onSelectionChanged={onSelectedViewChanged}
            />
          </GridItem>
          <Grid>
            <div className="empty-space" />
          </Grid>
        </Grid>
        <GridItem className="monitoring-content-view">
          {renderSelectedView()}
        </GridItem>
      </Grid>
    </Box>
  );
};
