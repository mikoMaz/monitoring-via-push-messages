import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Switch,
  Grid,
  Button,
  Center,
  Flex,
  GridItem,
  HStack,
  VStack,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChartTemplate, chartType } from "../../../types/chartTemplate";

interface INewCustomChartCreator {
  template: ChartTemplate;
  editFunction: (editedTemplate: ChartTemplate) => void;
}

export const NewCustomChartCreator = ({
  template,
  editFunction,
}: INewCustomChartCreator) => {
  const [percentFragmentationVariable, setPercentFragmentationVariable] =
    useState<string>("0.5");
  const [templateName, setTemplateName] = useState<string>(template.name);
  const [selectedType, setSelectedType] = useState<chartType>(template.type);

  const handleSave = () => {
    template.name = templateName;
    editFunction(template);
  };

  const variableChanged = (v: string) => {
    setPercentFragmentationVariable(v);
    template.chartModel.percentFragmentation = parseFloat(v);
  };

  const drawEditPresetNumberInputs = () => {
    if (selectedType === chartType.Recent) {
      return (
        <HStack>
          <Heading size="sm">Fragmentation: </Heading>
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
        </HStack>
      );
    }
  };

  const drawEditPresetNameInput = () => {
    return (
      <HStack justifyContent="flex-start">
        <Heading size="sm">Name:</Heading>
        <Input
          htmlSize={15}
          width="auto"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <Button onClick={handleSave} colorScheme="secondary">
          Save
        </Button>
      </HStack>
    );
  };

  const drawEditBrushSwitch = () => {
    if (selectedType === chartType.Recent) {
      return (
        <HStack>
          <Heading size="sm">Brush: </Heading>
          <Flex alignItems="center" justifyContent="flex-start" height="100%">
            <Switch size="lg" colorScheme="primary" id="active-brush" />
          </Flex>
        </HStack>
      );
    }
  };

  const drawEditSelectChartType = () => {
    const handleChange = (event: any) => {
      const value = chartType[event.target.value as keyof typeof chartType] ?? chartType.EmptyPreset;
      setSelectedType(value);
    };

    return (
      <Select placeholder="Select type of the chart" onChange={handleChange}>
        {Object.values(chartType).map((type) => {
          if (typeof type === "string") {
            return (
              <option key={type} value={type}>
                {type}
              </option>
            );
          }
        })}
      </Select>
    );
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem colSpan={1}>
        <VStack alignItems="start">
          {drawEditPresetNameInput()}
          {drawEditSelectChartType()}
          {drawEditPresetNumberInputs()}
          {drawEditBrushSwitch()}
        </VStack>
      </GridItem>
    </Grid>
  );
};
