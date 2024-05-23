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

interface IGatewayRowViewProps {
  gateway: Gateway
}

export const GatewayRowView = ({gateway}: IGatewayRowViewProps) => {
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
    <Accordion allowMultiple key={gateway.id}>
      <AccordionItem key={gateway.id}>
        <AccordionButton>
          <GatewayButton />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <SensorsTable sensors={gateway.sensors} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
