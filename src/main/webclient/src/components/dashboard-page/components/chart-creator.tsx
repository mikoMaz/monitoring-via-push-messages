import {
  Button,
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
import { InfoOutlined } from "@mui/icons-material";
import { NewCustomChartCreator } from "./new-custom-chart-creator";
import { UIProps } from "../../../config/config";
import { localStorageKey, LocalStorageManager, FileSaver } from '../../../types/fileSaver';

interface IChartCreator {
  model: DeviceModel;
  devicesUptime: number[];
}

export const ChartCreator = ({ model, devicesUptime }: IChartCreator) => {
  const localStorageKey: localStorageKey = "chartPresets";

  // const savePresetsToLocalStorage = (presets: ChartTemplate[]) => {
  //   localStorage.setItem(
  //     localStorageKey,
  //     JSON.stringify(presets.map((p) => p.toJSON()))
  //   );
  // };

  // const loadPresetsFromLocalStorage = (): ChartTemplate[] => {
  //   // const removed = localStorage.removeItem(localStorageKey);
  //   const savedPresets = localStorage.getItem(localStorageKey);
  //   if (savedPresets) {
  //     return JSON.parse(savedPresets).map((presetData: any) =>
  //       ChartTemplate.fromJSON(presetData)
  //     );
  //   }
  //   return [];
  // };

  const [chartPresets, setChartPresets] = useState<ChartTemplate[]>(() => {
    const presets = LocalStorageManager.loadPresetsFromLocalStorage(localStorageKey);
    console.log(presets);
    if (presets.length > 0) {
      return presets;
    }
    return [
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
    ];
  });

  // const saveChartPresets = (templates: ChartTemplate[]) => {
  //   const presetsJSON = JSON.stringify(
  //     templates.map((preset) => {
  //       if (typeof preset.type === "number") {
  //         return {
  //           id: preset.id,
  //           name: preset.name,
  //           type: chartType[preset.type],
  //           chartModel: preset.chartModel,
  //         };
  //       } else {
  //         return preset.toJSON();
  //       }
  //     }),
  //     null,
  //     2
  //   );
  //   const blob = new Blob([presetsJSON], { type: "application/json" });
  //   saveAs(blob, "chartPresets.json");
  //   // savePresetsToLocalStorage(chartPresets);
  // };

  const addOrUpdatePreset = (newPreset: ChartTemplate) => {
    setChartPresets((prevPresets) => {
      const updatedPresets = [...prevPresets];
      const index = updatedPresets.findIndex(
        (preset) => preset.name === newPreset.name
      );
      if (index !== -1) {
        updatedPresets[index] = newPreset;
        console.log("is type updated ", newPreset.type)
      } else {
        updatedPresets.push(newPreset);
      }
      LocalStorageManager.savePresetsToLocalStorage(localStorageKey, updatedPresets, model);
      FileSaver.saveChartPresetsToJson(updatedPresets);
      console.log(updatedPresets);
      return updatedPresets;
    });
  };

  useEffect(() => {
    const savedPresets = LocalStorageManager.loadPresetsFromLocalStorage(localStorageKey);
    if (savedPresets.length > 0) {
      setChartPresets(savedPresets);
    }
  }, []);

  const [newChartTemplate, setNewChartTemplate] = useState<ChartTemplate>(
    getEmptyPreset(model, devicesUptime)
  );

  const handlePresetChanged = (editedTemplate: ChartTemplate) => {
    addOrUpdatePreset(editedTemplate);
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
                  // saveFunction={saveChartPresets}
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
