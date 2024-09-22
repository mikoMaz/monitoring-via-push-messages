import {
  Box,
  Center,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { UIProps } from "../../config/config";
import { useState } from "react";
import { ViewChartsTabs } from "./components/view-charts-tabs";
import { RecentChart } from "./components/recent-chart";
import { CurrentChart } from "./components/current-chart";
import { RecentChartCustom } from "./components/recent-chart-custom";

enum viewOption {
  current,
  recent,
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
  const [variable, setVariable] = useState("0.5");

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
            <CurrentChart model={model} devices={devicesUptime} />
          </Center>
        );
      case viewOption.recent:
        return (
          <Center>
            <RecentChart devices={devicesUptime} />
          </Center>
        );
      case viewOption.custom:
        return (
          <Grid>
            <GridItem>
              <Tabs orientation="vertical" colorScheme="green">
                <TabList>
                  <Tab mb={4}>One</Tab>
                  <Tab mb={4}>Recent</Tab>
                  <Tab mb={4}>Three</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Center>
                      <CurrentChart model={model} devices={devicesUptime} />
                    </Center>
                  </TabPanel>
                  <TabPanel>
                    <NumberInput
                      step={0.05}
                      precision={2}
                      min={0.001}
                      max={20}
                      keepWithinRange={false}
                      clampValueOnBlur={false}
                      maxW={20}
                      value={variable}
                      onChange={(valueString) => setVariable(valueString)}
                      ml="50px"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Center>
                      {parseFloat(variable) === 0 ||
                      isNaN(parseFloat(variable)) ? (
                        <p>No data</p>
                      ) : (
                        <RecentChartCustom
                          devices={devicesUptime}
                          variable={parseFloat(variable)}
                        />
                      )}
                    </Center>
                  </TabPanel>

                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
            <GridItem></GridItem>
          </Grid>
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
        <Grid templateColumns="3fr 7fr">
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
