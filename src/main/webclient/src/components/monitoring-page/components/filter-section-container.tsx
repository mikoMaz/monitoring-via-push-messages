import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  HStack,
  Switch,
  VStack,
} from "@chakra-ui/react";
import { FilteringHeight } from "../../../types/projectTypes";

interface IFilterSectionProps {
  height: FilteringHeight;
  inactiveDevicesSwitched: () => void;
  inactiveSwitchEnabled: boolean;
}

export const FilterSectionContainer = ({
  height,
  inactiveDevicesSwitched,
  inactiveSwitchEnabled,
}: IFilterSectionProps) => {
  return height === "100px" ? (
    <Card variant="filled" bg="whiteAlpha.700">
      <CardBody>
        <VStack align="start">
          <HStack spacing={4} justify="flex-start" width="100%">
            <FormControl
              display="flex"
              alignItems="center"
              width="auto"
              marginEnd={6}
            >
              <FormLabel htmlFor="inactive-switch" mb={1} mr={4}>
                Inactive only
              </FormLabel>
              <Switch
                id="inactive-switch"
                isChecked={inactiveSwitchEnabled}
                colorScheme="primary"
                onChange={(e) => {
                  inactiveDevicesSwitched();
                }}
              />
            </FormControl>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  ) : (
    <></>
  );
};
