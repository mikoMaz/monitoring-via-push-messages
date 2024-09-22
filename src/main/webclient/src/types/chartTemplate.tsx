import {
  Center,
  Grid,
  GridItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  TabPanel,
} from "@chakra-ui/react";
import {
  CurrentChart,
  ICurrentChart,
} from "../components/dashboard-page/components/current-chart";
import {
  IRecentChart,
  RecentChart,
} from "../components/dashboard-page/components/recent-chart";
import { useState } from "react";

export enum chartType {
  Current,
  Recent,
}

export class ChartTemplate {
  public name: string;
  public type: chartType;
  recentChartModel?: IRecentChart;
  currentChartModel?: ICurrentChart;

  constructor(
    name: string,
    type: chartType,
    recentChartModel?: IRecentChart,
    currentChartModel?: ICurrentChart
  ) {
    this.name = name;
    this.type = type;
    this.recentChartModel = recentChartModel;
    this.currentChartModel = currentChartModel;
  }

  private invalidChart() {
    return <>Data model is not present</>;
  }

  public drawChart() {
    switch (this.type) {
      case chartType.Current:
        if (this.currentChartModel) {
          return <CurrentChart {...this.currentChartModel} />;
        } else {
          return this.invalidChart();
        }
      case chartType.Recent:
        if (this.recentChartModel) {
          return <RecentChart {...this.recentChartModel} />;
        } else {
          return this.invalidChart();
        }
      default:
        return this.invalidChart();
    }
  }
}

interface IChartTabPanel {
  template: ChartTemplate;
}

export const ChartTabPanel = ({ template }: IChartTabPanel) => {
  const [percentFragmentationVariable, setPercentFragmentationVariable] = useState<string>("0.5");
  // const [chartTemplate] = useState<ChartTemplate>(template);

  const variableChanged = (v: string) => {
    setPercentFragmentationVariable(v);
    const vParsed = parseFloat(v);
    if (template.recentChartModel) {
      template.recentChartModel.percentFragmentation = vParsed;
    }
  };

  const drawEditPresetNumberInputs = () => {
    if (template.type === chartType.Recent) {
      return (
        <NumberInput
          step={0.05}
          precision={2}
          min={0.001}
          keepWithinRange={false}
          clampValueOnBlur={false}
          maxW={20}
          value={percentFragmentationVariable}
          onChange={(valueString) => variableChanged(valueString)}
          ml="50px"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      );
    }
  };

  return (
    <TabPanel>
      {drawEditPresetNumberInputs()}
      <Center>
        {parseFloat(percentFragmentationVariable) === 0 || isNaN(parseFloat(percentFragmentationVariable)) ? (
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
