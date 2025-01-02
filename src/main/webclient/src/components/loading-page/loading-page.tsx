import { Center, Heading, HStack, Spinner } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const LoadingPage = () => {
  return (
    <Center h="100vh">
      <HStack spacing={5} bg={UIProps.colors.background}>
        <Heading>Loading</Heading>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor={UIProps.colors.secondary}
          color={UIProps.colors.primary}
          size="xl"
        />
      </HStack>
    </Center>
  );
};
