import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Text,
  textDecoration,
} from "@chakra-ui/react";
import { Bridge, deviceType } from "../../../../../types/deviceModel";
import { GatewayRowView } from "./gateway-row-view";
import { StatusDotIndicator } from "../../../status-dot-indicator";
import { Link } from "react-router-dom";
import { DeviceDetailsLink } from "./device-details-link";

interface IBridgeRowViewProps {
  bridge: Bridge;
}

export const BridgeRowView = ({ bridge }: IBridgeRowViewProps) => {
  const BridgeButton = () => {
    return (
      <>
        <Box as="span" flex="1" textAlign="left">
          <HStack>
            <StatusDotIndicator status={bridge.status} />
            <DeviceDetailsLink type={deviceType.bridge} id={bridge.id} />
          </HStack>
        </Box>
        <AccordionIcon />
      </>
    );
  };

  return (
    <AccordionItem key={bridge.id}>
      <AccordionButton>
        <BridgeButton />
      </AccordionButton>
      <AccordionPanel>
        {bridge.gateways.map((gateway) => (
          <GatewayRowView gateway={gateway} />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
};
