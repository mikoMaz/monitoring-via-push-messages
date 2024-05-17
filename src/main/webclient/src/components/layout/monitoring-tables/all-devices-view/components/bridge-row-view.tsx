import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Bridge } from "../../../../../types/deviceModel";
import { GatewayRowView } from "./gateway-row-view";

interface IBridgeRowViewProps {
  bridge: Bridge
}

export const BridgeRowView = ({bridge}: IBridgeRowViewProps) => {
  const BridgeButton = () => {
    return (
      <>
        <Box as="span" flex="1" textAlign="left">
          Bridge {bridge.id}
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
