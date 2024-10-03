import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
} from "@chakra-ui/react";
import { DeviceModel } from "../../../types/deviceModel";
import { useEffect, useState } from "react";
import {
  ChartTabPanel,
  ChartTemplate,
  chartType,
  getEmptyPreset,
} from "../../../types/chartTemplate";
import { Add, Info, InfoOutlined } from "@mui/icons-material";
import { NewCustomChartCreator } from "./new-custom-chart-creator";
import { UIProps } from "../../../config/config";
import saveAs from "file-saver";

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

  const saveChartPresets = () => {
    const presetsJSON = JSON.stringify(chartPresets, null, 2);
    const blob = new Blob([presetsJSON], { type: 'application/json' });
    saveAs(blob, 'chartPresets.json');
  };

  const [newChartTemplate, setNewChartTemplate] = useState<ChartTemplate>(
    getEmptyPreset(model, devicesUptime)
  );

  const handlePresetChanged = (editedTemplate: ChartTemplate) => {
    setChartPresets((prev) => {
      const index = prev.findIndex((temp) => temp.id === editedTemplate.id);
      if (index >= 0) {
        const updatedPresets = [...prev];
        updatedPresets[index] = editedTemplate;
        return updatedPresets;
      }
      return prev;
    });
  };

  const createNewPreset = () => {
    if (!chartPresets.find((p) => p.type === chartType.EmptyPreset)) {
      const emptyPreset = getEmptyPreset(model, devicesUptime);
      setNewChartTemplate(emptyPreset);
      setChartPresets([...chartPresets, emptyPreset]);
    }
  };

  const TabListElements = () => {
    return (
      <TabList>
        {chartPresets.map((preset) => {
          return (
            <Tab width="120px" mb={4}>
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
          if (preset.type !== chartType.EmptyPreset) {
            return (
              <ChartTabPanel
                template={preset}
                editFunction={handlePresetChanged}
              />
            );
          } else {
            return (
              <TabPanel>
                <NewCustomChartCreator
                  template={newChartTemplate}
                  editFunction={handlePresetChanged}
                  saveFunction={saveChartPresets}
                />
              </TabPanel>
            );
          }
        })}
      </TabPanels>
    );
  };

  return (
    <Grid
    //   templateAreas={`"nav header"
    //     "nav main"`}
    //   gridTemplateRows={"200px 1fr"}
    //   gridTemplateColumns={"120px 1fr"}
    //   h="1000px"
    //   gap="1"
    //   color="blackAlpha.700"
    //   fontWeight="bold"
    >
      {/* <GridItem pl="2" bg="pink.300" area={"nav"}>
        <Button
          leftIcon={<Add />}
          colorScheme="green"
          variant="solid"
          size="md"
          marginBottom="20px"
          onClick={createNewPreset}
        >
          New
        </Button>
        {/* <Tabs orientation="vertical" colorScheme="green">
          <TabListElements />
          <TabPanelsElements />
        </Tabs> */}
      {/* </GridItem>
      <GridItem pl="2" bg="orange.300" area={"header"}>
        {" "}
        <NewCustomChartCreator
          template={newChartTemplate}
          editFunction={handlePresetChanged}
        />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        Main
      </GridItem> */}
      <GridItem marginBottom="20px">
        <HStack>
          <Button colorScheme="green" onClick={createNewPreset}>
            New
          </Button>
          <Flex alignItems="center" justifyContent="flex-start" height="100%">
            <Tooltip
              label="Create new custom chart"
              bg="gray.100"
              color="gray.500"
              placement="right"
            >
              <InfoOutlined style={{ color: UIProps.colors.accent }} />
            </Tooltip>
          </Flex>
        </HStack>
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
