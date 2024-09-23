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
  public name: string;
  public type: chartType;
  chartModel: IChartTemplateModel;

  constructor(name: string, type: chartType, chartModel: IChartTemplateModel) {
    this.name = name;
    this.type = type;
    this.chartModel = chartModel;
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
}

export const ChartTabPanel = ({ template }: IChartTabPanel) => {
  const [percentFragmentationVariable, setPercentFragmentationVariable] =
    useState<string>("0.5");
  const [templateName, setTemplateName] = useState<string>(template.name);
  // const [chartTemplate] = useState<ChartTemplate>(template);

  const handleSave = () => {
    template.name = templateName; // Aktualizacja nazwy w obiekcie template
    console.log("Template name saved:", template.name);
  };

  const variableChanged = (v: string) => {
    setPercentFragmentationVariable(v);
    template.chartModel.percentFragmentation = parseFloat(v);
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
        value={templateName} // Bindowanie stanu templateName
        onChange={(e) => setTemplateName(e.target.value)} // Obsługa zmian
      />
    );
  };

  const drawEditBrushSwitch = () => {
    return <Switch size="lg" colorScheme="primary" id="active-brush" />;
  };

  return (
    <TabPanel>
      <Grid templateColumns="repeat(20, 1fr)" marginLeft="100px">
        <GridItem colSpan={3}>
          <Center>{drawEditPresetNameInput()}</Center>
        </GridItem>
        {/* Dodany przycisk "Save" */}
        <GridItem colSpan={1}>
          <Center>
            <Button onClick={handleSave} colorScheme="secondary">
              Save
            </Button>
          </Center>
        </GridItem>
        <GridItem colSpan={2}>
          <Center>{drawEditPresetNumberInputs()}</Center>
        </GridItem>
        <GridItem colSpan={1}>
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
