import {
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { DeviceModel } from "../../../types/deviceModel";
import { useEffect, useRef, useState } from "react";
import {
  ChartTabPanel,
  ChartTemplate,
  chartType,
  getEmptyPreset,
} from "../../../types/chartTemplate";
import { Download, InfoOutlined, Upgrade, Upload } from "@mui/icons-material";
import { NewCustomChartCreator } from "./new-custom-chart-creator";
import { UIProps } from "../../../config/config";
import {
  localStorageKey,
  LocalStorageManager,
  FileSaver,
  chartTemplateJsonObject,
} from "../../../types/fileSaver";

interface IChartCreator {
  model: DeviceModel;
  devicesUptime: number[];
}

export const ChartCreator = ({ model, devicesUptime }: IChartCreator) => {
  const localStorageKey: localStorageKey = "chartPresets";

  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);

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
    const presets =
      LocalStorageManager.loadPresetsFromLocalStorage(localStorageKey);
    if (presets.length > 0) {
      return presets;
    }
    return [];
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
        console.log("is type updated ", newPreset.type);
      } else {
        updatedPresets.push(newPreset);
      }
      LocalStorageManager.savePresetsToLocalStorage(
        localStorageKey,
        updatedPresets,
        model
      );
      console.log(updatedPresets);
      return updatedPresets;
    });
  };

  const handlePresetTabSelected = (index: number) => {
    setSelectedTemplateIndex(index);
  };

  // useEffect(() => {
  //   const savedPresets =
  //     LocalStorageManager.loadPresetsFromLocalStorage(localStorageKey);
  //   if (savedPresets.length > 0) {
  //     setChartPresets(savedPresets);
  //   }
  // }, []);

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
      const index = chartPresets.length - 1;
      setChartPresets([...chartPresets, emptyPreset]);
      setSelectedTemplateIndex(index + 1);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleExportClick = () => {
    FileSaver.saveChartPresetsToJson(chartPresets, model);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (content) {
          try {
            const importedPresets: chartTemplateJsonObject = JSON.parse(
              content as string
            );
            const parsedPresets =
              FileSaver.parseJsonToChartTemplates(importedPresets);
            setChartPresets((prevPresets) => {
              const allPresets = [...prevPresets, ...parsedPresets];
              LocalStorageManager.savePresetsToLocalStorage(
                localStorageKey,
                allPresets,
                model
              );
              console.log("Imported presets:", importedPresets);
              return allPresets;
            });
          } catch (error) {
            console.error("Error parsing imported file:", error);
          }
        }
      };
      reader.readAsText(file);
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
    <Grid>
      <GridItem marginBottom="20px">
        <VStack align="stretch" spacing={4}>
          <HStack spacing={2}>
            <Button colorScheme="green" onClick={createNewPreset} width="100px">
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
          <HStack spacing={2}>
            <Flex width="100px" justifyContent="space-between" gap={2}>
              <Tooltip label="Import" aria-label="Import tooltip">
                <IconButton
                  icon={<Upload />}
                  colorScheme="primary"
                  onClick={handleImportClick}
                  aria-label="Import"
                  flex="1"
                />
              </Tooltip>
              <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <Tooltip label="Export All" aria-label="Export tooltip">
                <IconButton
                  icon={<Download />}
                  colorScheme="primary"
                  onClick={handleExportClick}
                  aria-label="Export All"
                  flex="1"
                />
              </Tooltip>
            </Flex>
          </HStack>
        </VStack>
      </GridItem>
      <GridItem>
        <Tabs
          isLazy
          index={selectedTemplateIndex}
          onChange={handlePresetTabSelected}
          orientation="vertical"
          colorScheme="green"
        >
          <TabListElements />
          <TabPanelsElements />
        </Tabs>
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  );
};
