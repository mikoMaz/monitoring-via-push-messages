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
  Flex,
  GridItem,
  HStack,
  VStack,
  Heading,
  Select,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  ChartTemplate,
  chartType,
  chartTypeFromString,
  chartTypeToString,
} from "../../../types/chartTemplate";
import { returnDeviceTypesArray } from "../../../types/deviceModel";
import "react-datepicker/dist/react-datepicker.css";
import { ChakraDatePicker } from "./date-picker";

interface INewCustomChartCreator {
  template: ChartTemplate;
  editFunction: (editedTemplate: ChartTemplate) => void;
}

export const NewCustomChartCreator = ({
  template,
  editFunction,
}: INewCustomChartCreator) => {
  const [percentFragmentationVariable, setPercentFragmentationVariable] =
    useState<string>(template.chartModel.percentFragmentation.toString());
  const [templateName, setTemplateName] = useState<string>(template.name);
  const [selectedType, setSelectedType] = useState<chartType>(template.type);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    returnDeviceTypesArray().map((t) => false)
  );
  const [isBrushActive, setIsBrushActive] = useState<boolean>(
    template.chartModel.brushActive
  );
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSave = () => {
    template.name = templateName;
    template.type = selectedType;
    template.chartModel.percentFragmentation = parseFloat(
      percentFragmentationVariable
    );
    template.chartModel.brushActive = isBrushActive;
    editFunction(template);
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
            onChange={(valueString) =>
              setPercentFragmentationVariable(valueString)
            }
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
            <Switch
              size="lg"
              colorScheme="primary"
              id="active-brush"
              isChecked={isBrushActive}
              onChange={(e) => setIsBrushActive(e.target.checked)}
            />
          </Flex>
        </HStack>
      );
    }
  };

  const drawEditSelectChartType = () => {
    const handleChange = (event: any) => {
      setSelectedType(chartTypeFromString(event.target.value.toString()));
    };

    return (
      <Select
        placeholder={
          template.type === chartType.EmptyPreset
            ? "Select type of the chart"
            : chartTypeToString(template.type)
        }
        onChange={handleChange}
      >
        {Object.values(chartType)
          .filter((type): type is string => typeof type === "string")
          .map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
      </Select>
    );
  };

  const drawEditCheckboxDeviceType = () => {
    const allChecked = checkedItems.every(Boolean);
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

    function replaceAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
      if (index >= 0 && index < arr.length) {
        const newArr = [...arr];
        newArr[index] = newValue;
        return newArr;
      }
      return arr;
    }

    if (selectedType !== chartType.EmptyPreset) {
      return (
        <>
          <Checkbox
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={(e) =>
              setCheckedItems(
                returnDeviceTypesArray().map((t) => e.target.checked)
              )
            }
          >
            All Devices
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1}>
            {returnDeviceTypesArray().map((value, index) => (
              <Checkbox
                isChecked={checkedItems[index]}
                onChange={(e) =>
                  setCheckedItems(
                    replaceAtIndex(checkedItems, index, e.target.checked)
                  )
                }
              >
                {value}
              </Checkbox>
            ))}
          </Stack>
        </>
      );
    }
  };

  const drawDatePicker = () => {
    if (selectedType !== chartType.EmptyPreset) {
      return (
        <HStack>
          <Heading size="sm">From:</Heading>
          <ChakraDatePicker
            value={startDate}
            onChange={(date) => {
              const newStartDate = date ?? new Date();
              setStartDate(newStartDate);
              if (newStartDate > endDate) {
                setEndDate(newStartDate);
              }
            }}
          />
          <Heading size="sm">To:</Heading>
          <ChakraDatePicker
            value={endDate}
            onChange={(date) => {
              const newEndDate = date ?? new Date();
              if (newEndDate < startDate) {
                setEndDate(startDate);
              } else {
                setEndDate(newEndDate);
              }
            }}
          />
        </HStack>
      );
    }
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap="10">
      <GridItem colSpan={1}>
        <VStack alignItems="start">
          {drawEditPresetNameInput()}
          {drawEditSelectChartType()}
          {drawEditPresetNumberInputs()}
          {drawEditBrushSwitch()}
        </VStack>
      </GridItem>
      <GridItem colSpan={1}>
        <VStack alignItems="start">
          {drawEditCheckboxDeviceType()}
          {drawDatePicker()}
        </VStack>
      </GridItem>
    </Grid>
  );
};