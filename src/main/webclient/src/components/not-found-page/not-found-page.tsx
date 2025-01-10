import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const NotFoundPage = () => {
  document.body.style.backgroundColor = UIProps.colors.background;
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <VStack spacing={5} bg={UIProps.colors.background} paddingTop={25}>
        <Heading>Not found</Heading>
        <Text>URL not found</Text>
      </VStack>
    </Box>
  );
};
