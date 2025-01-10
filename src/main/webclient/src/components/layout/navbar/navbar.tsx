import {
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { NavigationButtons } from "./components/navigation-buttons/navigation-buttons";
import { UserSidebar } from "./components/user-sidebar/user-sidebar";
import { Logo } from "./components/logo/logo";
import { UIProps } from "../../../config/config";
import { usingTestData } from "../../../util/useTestData";

interface INavbar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
}

export const Navbar = ({ alertsEnabled, setAlertsEnabled }: INavbar) => {
  const ui = UIProps;
  return (
    <Box>
      <Grid
        templateColumns="auto auto 1fr auto auto"
        gap={2}
        background={ui.colors.background}
        padding="10px"
        height={ui.height.navbar}
      >
        <GridItem>
          <VStack spacing={4} align="center" height="100%" width="auto">
            <Logo />
          </VStack>
        </GridItem>
        <GridItem width="auto">
          <Center height="100%">
            <Heading color="black" size="lg" paddingX={10}>
              ErrWarn
            </Heading>
          </Center>
        </GridItem>
        <GridItem colSpan={1}>
          <Center height="100%">
            <Text fontSize="16px" color="red">
              {usingTestData()
                ? "Application is using test data. Connection to api was detached!"
                : ""}
            </Text>
          </Center>
        </GridItem>
        <GridItem
          width="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Center height="100%" minHeight="100%" paddingX={30}>
            <NavigationButtons />
          </Center>
        </GridItem>
        <GridItem
          width="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Center height="100%" minHeight="100%" width="100%" paddingX={2}>
            <UserSidebar
              alertsEnabled={alertsEnabled}
              setAlertsEnabled={setAlertsEnabled}
            />
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};
