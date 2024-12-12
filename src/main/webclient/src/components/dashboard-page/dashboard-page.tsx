import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { UIProps } from "../../config/config";
import { useState } from "react";
import { ViewChartsTabs } from "./components/view-charts-tabs";
import { RecentChart } from "./components/recent-chart";
import { CurrentChart } from "./components/current-chart";
import { ChartCreator } from "./components/chart-creator";
import { IChartTemplateModel } from "../../types/chartTemplate";
import { HistoryChart } from "./components/history-chart";

enum viewOption {
  current,
  recent,
  recentHistory,
  custom,
}

interface IDashboardPage {
  model: DeviceModel;
  devicesUptime: number[];
}

export const DashboardPage = ({ model, devicesUptime }: IDashboardPage) => {
  const [selectedViewOption, setSelectedViewOption] = useState<viewOption>(
    viewOption.current
  );

  const chartModel: IChartTemplateModel = {
    devicesHistoryValues: devicesUptime,
    model: model,
    percentFragmentation: 0.5,
    brushActive: false,
  };

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
          <Center>
            <CurrentChart {...chartModel} />
          </Center>
        );
      case viewOption.recent:
        return (
          <Center>
            <RecentChart {...chartModel} />
          </Center>
        );
      case viewOption.recentHistory:
        return (
          <Center>
            <HistoryChart />
          </Center>
        );
      case viewOption.custom:
        return <ChartCreator model={model} devicesUptime={devicesUptime} />;
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
