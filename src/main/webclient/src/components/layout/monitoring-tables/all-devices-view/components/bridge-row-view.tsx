import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Bridge } from "../../../../../types/deviceModel";
import { GatewayRowView } from "./gateway-row-view";

export const BridgeRowView = (bridge: Bridge) => {
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
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <BridgeButton />
        </AccordionButton>
        <AccordionPanel>
          {bridge.gateways.map((gateway) => (
            <GatewayRowView {...gateway} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
