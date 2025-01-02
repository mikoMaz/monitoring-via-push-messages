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
import {
  AllDevicesUptimeJson,
  DeviceModel,
  deviceType,
} from "../../../types/deviceModel";
import { useRef, useState } from "react";
import {
  ChartTabPanel,
  ChartTemplate,
  chartType,
  getEmptyPreset,
} from "../../../types/chartTemplate";
import { Download, InfoOutlined, Upload } from "@mui/icons-material";
import { ChartCreator } from "./chart-creator";
import { UIProps } from "../../../config/config";
import { returnDeviceTypesArray } from "../../../types/deviceModel";
import {
  FileSaver,
  chartTemplateJsonObject,
} from "../../../types/fileSaver";
import { LocalStorageManager } from "../../../types/localStorageMenager";

interface ICustomChartsTab {
  model: DeviceModel;
  devicesUptime: AllDevicesUptimeJson;
}

export const CustomChartsTab = ({ model, devicesUptime }: ICustomChartsTab) => {
  const allHistoryValues = [
    ...devicesUptime.upperLevel,
    ...devicesUptime.middleLevel,
    ...devicesUptime.bottomLevel,
  ];

  const returnDeviceUptimesByDeviceType = (devices: deviceType[]) => {
    let uptimeValues: number[] = [];
    if (devices) {
      if (devices.length === returnDeviceTypesArray().length) {
        return allHistoryValues;
      }
      if (devices.includes(deviceType.sensor)) {
        uptimeValues = [...uptimeValues, ...devicesUptime.bottomLevel];
      }
      if (devices.includes(deviceType.gateway)) {
        uptimeValues = [...uptimeValues, ...devicesUptime.middleLevel];
      }
      if (devices.includes(deviceType.bridge)) {
        uptimeValues = [...uptimeValues, ...devicesUptime.upperLevel];
      }
    }
    return uptimeValues;
  };

  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);

  const [chartPresets, setChartPresets] = useState<ChartTemplate[]>(() => {
    const presets =
      LocalStorageManager.loadPresetsFromLocalStorage();
    if (presets.length > 0) {
      return presets;
    }
    return [];
  });

  const addOrUpdatePreset = (newPreset: ChartTemplate) => {
    setChartPresets((prevPresets) => {
      const updatedPresets = [...prevPresets];
      const index = updatedPresets.findIndex(
        (preset) => preset.id === newPreset.id
      );
      if (index !== -1) {
        updatedPresets[index] = newPreset;
        console.log("is type updated ", newPreset.type);
      } else {
        updatedPresets.push(newPreset);
      }
      LocalStorageManager.savePresetsToLocalStorage(
        updatedPresets
      );
      return updatedPresets;
    });
  };

  const handlePresetTabSelected = (index: number) => {
    setSelectedTemplateIndex(index);
  };

  const [newChartTemplate, setNewChartTemplate] = useState<ChartTemplate>(
    getEmptyPreset()
  );

  const handlePresetChanged = (editedTemplate: ChartTemplate) => {
    addOrUpdatePreset(editedTemplate);
  };

  const createNewPreset = () => {
    if (!chartPresets.find((p) => p.type === chartType.EmptyPreset)) {
      const emptyPreset = getEmptyPreset();
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
    FileSaver.saveChartPresetsToJson(chartPresets);
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
                allPresets
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

  const handleDeletePreset = (id: number) => {
    if (window.confirm("Are you sure you want to delete this preset?")) {
      const updatedPresets = chartPresets.filter((preset) => preset.id !== id);
      setChartPresets(updatedPresets);
      if (updatedPresets.length > 0) {
        LocalStorageManager.savePresetsToLocalStorage(
          updatedPresets
        );
      } else {
        LocalStorageManager.clearLocalStorageEntry("chartPresets");
      }
      if (selectedTemplateIndex >= updatedPresets.length) {
        setSelectedTemplateIndex(0);
      }
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
                key={preset.id}
                template={preset}
                editFunction={handlePresetChanged}
                deleteFunction={() => handleDeletePreset(preset.id)}
                model={model}
                uptimeValues={returnDeviceUptimesByDeviceType(
                  preset.chartModel.deviceTypes
                )}
              />
            );
          } else {
            return (
              <TabPanel>
                <ChartCreator
                  template={newChartTemplate}
                  editFunction={handlePresetChanged}
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
