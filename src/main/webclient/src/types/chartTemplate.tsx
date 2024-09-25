import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  TabPanel,
} from "@chakra-ui/react";
import { CurrentChart } from "../components/dashboard-page/components/current-chart";
import { RecentChart } from "../components/dashboard-page/components/recent-chart";
import { useState } from "react";
import { DeviceModel } from "./deviceModel";

export enum chartType {
  Current,
  Recent,
}

export interface IChartTemplateModel {
  devicesHistoryValues: number[]; //devices percent values of active time history
  model: DeviceModel;
  percentFragmentation: number; //fragmentation of data into chunks by % points
}

export class ChartTemplate {
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
}

interface IChartTabPanel {
  template: ChartTemplate;
  editFunction: (
    editedTemplate: ChartTemplate
  ) => void;
}

export const ChartTabPanel = ({ template, editFunction }: IChartTabPanel) => {
  const [percentFragmentationVariable, setPercentFragmentationVariable] =
    useState<string>("0.5");

  return (
    <TabPanel>
      <Center>
        {parseFloat(percentFragmentationVariable) === 0 ||
        isNaN(parseFloat(percentFragmentationVariable)) ? (
          <p>
            We can't show you the chart, if you put "0" or nothing into the
            input section. Please write a number between 0.001 and 100.
          </p>
        ) : (
          template.drawChart()
        )}
      </Center>
    </TabPanel>
  );
};
