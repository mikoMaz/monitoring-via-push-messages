import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
} from "@chakra-ui/react";
import {
  Gateway,
  deviceStatus,
  deviceType,
} from "../../../../../types/deviceModel";
import { SensorsTable } from "./sensors-table";
import { StatusDotIndicator } from "../../../status-dot-indicator";
import { DeviceDetailsLink } from "./device-details-link";

interface IGatewayRowViewProps {
  gateway: Gateway;
  inactiveOnly: boolean;
  deviceIdFilter: string;
  isSorted: boolean;
}

export const GatewayRowView = ({
  gateway,
  inactiveOnly,
  deviceIdFilter,
  isSorted,
}: IGatewayRowViewProps) => {
  const filteredSensors = gateway.sensors.filter((sensor) =>
    sensor.id.includes(deviceIdFilter)
  );

  const sortedSensors = [...filteredSensors].sort((a, b) =>
    isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );

  const GatewayButton = () => {
    return (
      <>
        <Box as="span" flex="1" textAlign="left">
          <HStack>
            <StatusDotIndicator status={gateway.status} />
            <DeviceDetailsLink type={deviceType.gateway} id={gateway.id} />
          </HStack>
        </Box>
        <AccordionIcon />
      </>
    );
  };

  const sensorsToDisplay = inactiveOnly
    ? sortedSensors.filter((sensor) => sensor.status !== deviceStatus.active)
    : sortedSensors;

  if (
    inactiveOnly &&
    (gateway.status !== deviceStatus.active &&
      gateway.containAnyInactiveSensors())
  ) {
    return (
      <Accordion allowMultiple key={gateway.id} defaultIndex={[0]}>
        <AccordionItem key={gateway.id}>
          <AccordionButton>
            <GatewayButton />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SensorsTable
              sensors={sensorsToDisplay}
              inactiveOnly={inactiveOnly}
              deviceIdFilter={deviceIdFilter}
              isSorted={isSorted}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  } else {
    return (
      <Accordion allowMultiple key={gateway.id} defaultIndex={[0]}>
        <AccordionItem key={gateway.id}>
          <AccordionButton>
            <GatewayButton />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <SensorsTable
              sensors={sensorsToDisplay}
              inactiveOnly={inactiveOnly}
              deviceIdFilter={deviceIdFilter}
              isSorted={isSorted}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
};
