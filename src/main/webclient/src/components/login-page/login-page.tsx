import { Button, Center } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

interface ILoginPage {}

export const LoginPage = ({}: ILoginPage) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Center>
      <Button onClick={() => loginWithRedirect()}>Login</Button>
    </Center>
  );
};
