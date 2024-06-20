import { Box, Center, Grid, GridItem, HStack } from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { StatusPieChart } from "./components/status-pie-chart";
import { UIProps } from "../../config/config";
import { useState } from "react";
import { ViewChartsTabs } from "./components/view-charts-tabs";
import { RecentChart } from "./components/recent-chart";

enum viewOption {
  current,
  recent,
  custom,
}

export const DashboardPage = (model: DeviceModel) => {
  const [selectedViewOption, setSelectedViewOption] = useState<viewOption>(
    viewOption.current
  );

  const onSelectedViewChanged = (index: number) => {
    switch (index) {
      case 0:
        setSelectedViewOption(viewOption.current);
        break;
      case 1:
        setSelectedViewOption(viewOption.recent);
        break;
      case 2:
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
          <Center>
            <HStack>
              <StatusPieChart
                devices={model.getSensorsArray()}
                heading="Sensors"
              />
              <StatusPieChart
                devices={model.getGatewaysArray()}
                heading="Gateways"
              />
              <StatusPieChart
                devices={model.getBridgesArray()}
                heading="Bridges"
              />
            </HStack>
          </Center>
        );
      case viewOption.recent:
        return (
          <Center>
            <RecentChart devices={[2.2209, 0.0, 0.0, 0.0, 2.1909, 4.5, 2.4, 1.3, 8.9, 0.0, 7.8]} />
          </Center>
        );
      case viewOption.custom:
        return <>custom</>;
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
        <Grid templateColumns="3fr 7fr">
          <GridItem>
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
