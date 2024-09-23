import {
  Center,
  Flex,
  FormControl,
  FormLabel,
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
import {
  CurrentChart,
  ICurrentChart,
} from "../components/dashboard-page/components/current-chart";
import {
  IRecentChart,
  RecentChart,
} from "../components/dashboard-page/components/recent-chart";
import { useState } from "react";
import { UIProps } from "../config/config";

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
  const [percentFragmentationVariable, setPercentFragmentationVariable] =
    useState<string>("0.5");
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

  const drawEditPresetNameInput = () => {
    return (
      <Input
        htmlSize={15}
        width="auto"
        placeholder={template.name}
      />
    );
  };
  const drawEditBrushSwitch = () => {
    return <Switch size="lg" colorScheme="primary" id="active-brush" />;
  };

  return (
    <TabPanel>
      <Grid templateColumns="repeat(20, 1fr)" marginLeft="100px">
        <GridItem colSpan={3} backgroundColor="blue">
          <Center>{drawEditPresetNameInput()}</Center>
        </GridItem>
        <GridItem colSpan={2} backgroundColor="white">
          <Center>{drawEditPresetNumberInputs()}</Center>
        </GridItem>
        <GridItem colSpan={1} backgroundColor="red">
          <Flex alignItems="center" justifyContent="center" height="100%">
            {drawEditBrushSwitch()}
          </Flex>
        </GridItem>
      </Grid>
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
