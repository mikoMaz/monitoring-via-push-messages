import {
  Button,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { DeviceModel } from "../../../types/deviceModel";
import { useEffect, useState } from "react";
import {
  ChartTabPanel,
  ChartTemplate,
  chartType,
} from "../../../types/chartTemplate";

interface IChartCreator {
  model: DeviceModel;
  devicesUptime: number[];
}

export const ChartCreator = ({ model, devicesUptime }: IChartCreator) => {
  const [chartPresets, setChartPresets] = useState<ChartTemplate[]>([
    new ChartTemplate("current custom", chartType.Current, {
      devicesHistoryValues: devicesUptime,
      model: model,
      percentFragmentation: 0.5,
    }),
    new ChartTemplate("recent custom", chartType.Recent, {
      devicesHistoryValues: devicesUptime,
      percentFragmentation: 0.5,
      model: model,
    }),
    new ChartTemplate("recent custom 2", chartType.Recent, {
      devicesHistoryValues: devicesUptime,
      percentFragmentation: 0.5,
      model: model,
    }),
  ]);

  const handlePresetChanged = (
    editedTemplate: ChartTemplate
  ) => {
    const index = chartPresets.findIndex((temp) => temp.id === editedTemplate.id)
    if (index >= 0) {
      setChartPresets((prev) => {
        prev[index] = editedTemplate;
        return prev;
      });
    }
  };

  const TabListElements = () => {
    return (
      <TabList>
        {chartPresets.map((preset) => {
          return (
            <Tab width="100px" mb={4}>
              {preset.name}
            </Tab>
          );
        })}
      </TabList>
    );
  };

  const TabPanelsElements = () => {
    return (
      <TabPanels>
        {chartPresets.map((preset) => {
          return (
            <ChartTabPanel
              template={preset}
              editFunction={handlePresetChanged}
            />
          );
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
