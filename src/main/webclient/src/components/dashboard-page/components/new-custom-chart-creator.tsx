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
        value={templateName} // Bindowanie stanu templateName
        onChange={(e) => setTemplateName(e.target.value)} // Obsługa zmian
      />
    );
  };

  const drawEditBrushSwitch = () => {
    return <Switch size="lg" colorScheme="primary" id="active-brush" />;
  };

  return (
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
  );
};
