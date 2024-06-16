import { AccordionButton, Box, AccordionIcon } from "@chakra-ui/react";

export const CustomAccordionButton = ({ label }: { label: string }) => {
  return (
    <h2>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          {label}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  );
};
