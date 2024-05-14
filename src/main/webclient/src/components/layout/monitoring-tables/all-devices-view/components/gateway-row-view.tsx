import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Gateway } from "../../../../../types/deviceModel";
import { SensorsTable } from "./sensors-table";

export const GatewayRowView = (gateway: Gateway) => {
  const GatewayButton = () => {
    return (
      <>
        <Box as="span" flex="1" textAlign="left">
          Gateway {gateway.id}
        </Box>
        <AccordionIcon />
      </>
    );
  };

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <GatewayButton />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <SensorsTable {...gateway.sensors} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
