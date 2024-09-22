import {
  Button,
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
import { DeviceModel } from "../../../types/deviceModel";
import { useState } from "react";
import {
  ChartTabPanel,
  ChartTemplate,
  chartType,
} from "../../../types/chartTemplate";
import { CurrentChart } from "./current-chart";

interface IChartCreator {
  model: DeviceModel;
  devicesUptime: number[];
}

export const ChartCreator = ({ model, devicesUptime }: IChartCreator) => {
//   const [variable, setVariable] = useState("0.5");
  const [chartPresets, setChartPresets] = useState<ChartTemplate[]>([
    new ChartTemplate(chartType.Current, undefined, {
      devices: devicesUptime,
      model: model,
    }),
    new ChartTemplate(
      chartType.Recent,
      { devices: devicesUptime, percentFragmentation: 0.5 },
      undefined
    ),
    new ChartTemplate(chartType.Current, undefined, {
        devices: devicesUptime,
        model: model,
      }),
  ]);

  const TabListElements = () => {
    return (
      <TabList>
        <Tab mb={4}>One</Tab>
        <Tab mb={4}>Recent Custom</Tab>
        <Tab mb={4}>Three</Tab>
      </TabList>
    );
  };

  const TabPanelsElements = () => {
    return (
      <TabPanels>
        {chartPresets.map((preset) => {
          return <ChartTabPanel template={preset} />;
        })}
      </TabPanels>
    );
  };

  return (
    <Grid>
      <GridItem marginBottom="20px">
        <Button colorScheme="green">New</Button>
      </GridItem>
      <GridItem>
        <Tabs orientation="vertical" colorScheme="green">
          <TabListElements />
          <TabPanelsElements />
        </Tabs>
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  );
};
