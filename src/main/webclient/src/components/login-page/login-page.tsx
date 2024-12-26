import { Button, Center } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { UIProps } from "../../config/config";

interface ILoginPage {}

export const LoginPage = ({}: ILoginPage) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Center>
      <Button
        onClick={() => loginWithRedirect()}
        margin="50px"
        color="white"
        bg={UIProps.colors.primary}
      >
        Login
      </Button>
    </Center>
  );
};
