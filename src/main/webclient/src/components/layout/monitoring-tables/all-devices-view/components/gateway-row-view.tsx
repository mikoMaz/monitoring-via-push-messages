import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  Gateway,
  deviceStatus,
  deviceType,
} from "../../../../../types/deviceModel";
import { SensorsTable } from "./sensors-table";
import { StatusDotIndicator } from "../../../status-dot-indicator";
import { Link } from "react-router-dom";
import { DeviceDetailsLink } from "./device-details-link";

interface IGatewayRowViewProps {
  gateway: Gateway;
  inactiveOnly: boolean;
}

export const GatewayRowView = ({
  gateway,
  inactiveOnly,
}: IGatewayRowViewProps) => {
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
              sensors={gateway.sensors}
              inactiveOnly={inactiveOnly}
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
              sensors={gateway.sensors}
              inactiveOnly={inactiveOnly}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }
};
