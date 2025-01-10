import { AccordionButton, Box, AccordionIcon, Heading, Text } from "@chakra-ui/react";

export const CustomAccordionButton = ({
  label,
  title,
}: {
  label: string;
  title?: boolean;
}) => {
  function titleOrNot(label: string, title?: boolean ) {
    if (title) {
      return <Heading size="lg">{label}</Heading>;
    } else {
      return <Text fontSize="xl">{label}</Text>;
    }
  }
  return (
    <h2>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          {titleOrNot(label, title)}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
  );
};
