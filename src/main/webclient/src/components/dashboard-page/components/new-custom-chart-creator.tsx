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

  const handleSave = () => {
    template.name = templateName;
    editFunction(template);
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
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
      />
    );
  };

  const drawEditBrushSwitch = () => {
    return <Switch size="lg" colorScheme="primary" id="active-brush" />;
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)">
      <GridItem colSpan={1}>
        <VStack alignItems="start">
          <HStack justifyContent="flex-start">
            <Heading size="sm">Name:</Heading>
            {drawEditPresetNameInput()}
            <Button
              onClick={handleSave}
              colorScheme="secondary"
              marginLeft="10px"
              marginRight="10px"
            >
              Save
            </Button>
          </HStack>
          {drawEditPresetNumberInputs()} 
          <Flex alignItems="center" justifyContent="flex-start" height="100%">
            {drawEditBrushSwitch()}
          </Flex>
        </VStack>
      </GridItem>
    </Grid>
  );
};
