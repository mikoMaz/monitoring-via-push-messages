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
import { IUserInfoResponse } from "../../../types/IUserInfoResponse";
import { APIClient } from "../../../api/api-client";
import { ICompanyDto } from "../../../types/ICompanyDto";

interface INavbar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  userInfo: IUserInfoResponse;
  companies: ICompanyDto[];
  setDefaultCompany: (com: ICompanyDto | undefined) => void;
  defaultCompany: ICompanyDto | undefined;
}

export const Navbar = ({
  alertsEnabled,
  setAlertsEnabled,
  userInfo,
  companies,
  setDefaultCompany,
  defaultCompany
}: INavbar) => {
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
          <VStack align="center" height="100%" width="auto" paddingStart={4}>
            <Logo />
          </VStack>
        </GridItem>
        <GridItem width="auto">
          <Center height="100%">
            <Heading color="black" size="lg" paddingX={6}>
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
              userInfo={userInfo}
              companies={companies}
              setDefaultCompany={setDefaultCompany}
              defaultCompany={defaultCompany}
            />
          </Center>
        </GridItem>
      </Grid>
    </Box>
  );
};
