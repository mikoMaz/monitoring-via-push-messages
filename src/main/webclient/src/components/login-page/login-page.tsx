import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { UIProps } from "../../config/config";

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Center h="100vh">
      <VStack>
        <Heading>ErrWarn</Heading>
        <Text>Monitoring application</Text>
        <Button
          onClick={() => loginWithRedirect()}
          margin="50px"
          color="white"
          bg={UIProps.colors.primary}
        >
          Login
        </Button>
      </VStack>
    </Center>
  );
};
