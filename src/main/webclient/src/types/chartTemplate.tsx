import {
  Box,
  Button,
  Center,
  HStack,
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
  devicesHistoryValues: number[]; //devices percent values of active time history
  model: IDeviceModel;
  percentFragmentation: number; //fragmentation of data into chunks by % points
  isBrushActive: boolean;
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

  public drawChart() {
    switch (this.type) {
      case chartType.Current:
        return <CurrentChart {...this.chartModel} />;
      case chartType.Recent:
        return <RecentChart {...this.chartModel} />;
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
}

export const ChartTabPanel = ({ template, editFunction }: IChartTabPanel) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleExport = () => {
    FileSaver.saveSingleChartPresetToJson(template, template.chartModel.model);
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
                template.drawChart()
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
            <Tooltip label="Export data od the chart to JSON" aria-label="Export tooltip">
              <Button onClick={handleExport} colorScheme="green">
                Export
              </Button>
            </Tooltip>
          </HStack>
        </Box>
      </VStack>
    </TabPanel>
  );
};

export const getEmptyPreset = (model: DeviceModel, uptimeValues: number[]) => {
  return new ChartTemplate("New", chartType.EmptyPreset, {
    model: model,
    devicesHistoryValues: uptimeValues,
    percentFragmentation: 0.5,
    isBrushActive: false
  });
};
