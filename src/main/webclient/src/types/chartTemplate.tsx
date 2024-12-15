import {
  Box,
  Button,
  Center,
  HStack,
  IconButton,
  TabPanel,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { CurrentChart } from "../components/dashboard-page/components/current-chart";
import { RecentChart } from "../components/dashboard-page/components/recent-chart";
import { useState } from "react";
import { DeviceModel, IDeviceModel } from "./deviceModel";
import { NewCustomChartCreator } from "../components/dashboard-page/components/new-custom-chart-creator";
import { FileSaver } from "./fileSaver";
import { Delete } from "@mui/icons-material";

export enum chartType {
  EmptyPreset,
  Current,
  Recent,
}

export const chartTypeToString = (type: chartType): string => {
  return chartType[type];
};

export const chartTypeFromString = (type: string): chartType => {
  return chartType[type as keyof typeof chartType] ?? chartType.EmptyPreset;
};

export const returnChartTypesArray = (): string[] => {
  return Object.values(chartType).filter(
    (t): t is string => typeof t === "string"
  );
};

export interface IChartTemplateModel {
  percentFragmentation: number; //fragmentation of data into chunks by % points
  brushActive: boolean;
}

export interface IChartTemplateModelDrawing extends IChartTemplateModel {
  devicesHistoryValues: number[];
  model: IDeviceModel;
}

export interface IChartTemplate {
  id: number;
  name: string;
  type: chartType;
  chartModel: IChartTemplateModel;
}

export class ChartTemplate implements IChartTemplate {
  static fromJSON(presetData: any): ChartTemplate {
    const { id, name, type, chartModel } = presetData;
    const chartTypeValue = chartType[type as keyof typeof chartType];
    const template = new ChartTemplate(name, chartTypeValue, chartModel);
    if (id) {
      template.id = id;
    }
    return template;
  }

  public id: number;
  public name: string;
  public type: chartType;
  public chartModel: IChartTemplateModel;

  constructor(name: string, type: chartType, chartModel: IChartTemplateModel) {
    this.name = name;
    this.type = type;
    this.chartModel = chartModel;
    this.id = Math.random();
  }

  private invalidChart() {
    return <>Data model is not present</>;
  }

  public drawChart(model: IDeviceModel, uptimeValues: number[]) {
    switch (this.type) {
      case chartType.Current:
        return (
          <CurrentChart
            model={model}
            devicesHistoryValues={uptimeValues}
            {...this.chartModel}
          />
        );
      case chartType.Recent:
        return (
          <RecentChart
            model={model}
            devicesHistoryValues={uptimeValues}
            {...this.chartModel}
          />
        );
      default:
        return this.invalidChart();
    }
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      chartModel: this.chartModel,
    };
  }
}

interface IChartTabPanel {
  template: ChartTemplate;
  editFunction: (editedTemplate: ChartTemplate) => void;
  deleteFunction: () => void;
  model: IDeviceModel;
  uptimeValues: number[];
}

export const ChartTabPanel = ({
  template,
  editFunction,
  deleteFunction,
  model,
  uptimeValues,
}: IChartTabPanel) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleExport = () => {
    FileSaver.saveSingleChartPresetToJson(template);
  };

  return (
    <TabPanel>
      <VStack spacing={4} align="start" w="100%">
        <Box w="100%">
          {isEditing ? (
            <NewCustomChartCreator
              template={template}
              editFunction={editFunction}
            />
          ) : (
            <Center>
              {template.chartModel.percentFragmentation > 0.001 ? (
                template.drawChart(model, uptimeValues)
              ) : (
                <p>
                  We can't show you the chart, if you put "0" or nothing into
                  the input section. Please write a number between 0.001 and
                  100.
                </p>
              )}
            </Center>
          )}
        </Box>

        <Box position="relative" w="100%">
          <HStack spacing={4} justify="flex-end">
            <Button
              onClick={handleEditToggle}
              colorScheme="primary"
              position="relative"
            >
              {isEditing ? "Back to View" : "Edit"}
            </Button>
            <Tooltip
              label="Export data of the chart to JSON"
              aria-label="Export tooltip"
            >
              <Button onClick={handleExport} colorScheme="green">
                Export
              </Button>
            </Tooltip>
            <Tooltip label="Delete preset" aria-label="Delete tooltip">
              <IconButton
                icon={<Delete />}
                colorScheme="red"
                aria-label="Delete preset"
                onClick={deleteFunction}
              />
            </Tooltip>
          </HStack>
        </Box>
      </VStack>
    </TabPanel>
  );
};

export const getEmptyPreset = (model: DeviceModel, uptimeValues: number[]) => {
  return new ChartTemplate("New", chartType.EmptyPreset, {
    percentFragmentation: 0.5,
    brushActive: false,
  });
};
