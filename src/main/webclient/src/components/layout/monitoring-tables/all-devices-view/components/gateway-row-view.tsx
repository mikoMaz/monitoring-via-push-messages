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
}

export const GatewayRowView = ({
  gateway,
  inactiveOnly,
  deviceIdFilter,
}: IGatewayRowViewProps) => {
  const filteredSensors = gateway.sensors.filter((sensor) =>
    sensor.id.includes(deviceIdFilter)
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
    ? filteredSensors.filter((sensor) => sensor.status !== deviceStatus.active)
    : filteredSensors;

  if (
    inactiveOnly &&
    (gateway.status !== deviceStatus.active ||
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
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
};
