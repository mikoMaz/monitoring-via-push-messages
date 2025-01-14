import {
  Avatar,
  IconButton,
  Drawer,
  DrawerOverlay,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  GridItem,
  Grid,
  Button,
  DrawerFooter,
  Heading,
  HStack,
  VStack,
  Divider,
  AbsoluteCenter,
  Box,
} from "@chakra-ui/react";
import { UIProps } from "../../../../../config/config";
import { useAuth0 } from "@auth0/auth0-react";
import { LocalStorageManager } from "../../../../../types/localStorageMenager";
import { useNavigate } from "react-router-dom";
import { IUserInfoResponse } from "../../../../../types/IUserInfoResponse";
import { useEffect, useState } from "react";
import { ICompanyDto } from "../../../../../types/ICompanyDto";
import { APIClient } from "../../../../../api/api-client";
import { SelectDefaultCompany } from "./components/select-default-company-dropdown";
import { SetDisplayAlerts } from "./components/set-display-alerts";
import { getMailNickname } from "../../../../../types/projectTypes";

interface IUserSidebar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  userInfo: IUserInfoResponse;
  companies: ICompanyDto[];
  setDefaultCompany: (company: ICompanyDto | undefined) => void;
  defaultCompany: ICompanyDto | undefined;
}

export const UserSidebar = ({
  alertsEnabled,
  setAlertsEnabled,
  userInfo,
  companies,
  setDefaultCompany,
  defaultCompany
}: IUserSidebar) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, user } = useAuth0();

  const handleClearLocalStorage = () => {
    LocalStorageManager.clearLocalStorage();
    window.location.reload();
  };

  const navigate = useNavigate();

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={
          <Avatar size="sm" name={user?.name ?? user?.nickname ?? user?.mail} />
        }
        aria-label={"Profile"}
        colorScheme={UIProps.colors.accent}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <>{userInfo?.email ? getMailNickname(userInfo?.email) : user?.nickname}</>
          </DrawerHeader>
          <DrawerBody>
            <Grid templateRows="2fr auto auto">
              <GridItem mb={8}>
                <Box position="relative" paddingY={4}>
                  <Divider borderColor={"grey"} />
                  <AbsoluteCenter bg="white" px="4">
                    <Heading size="md">Settings</Heading>
                  </AbsoluteCenter>
                </Box>
              </GridItem>
              <GridItem>
                <VStack spacing={4} alignItems="flex-start">
                  <SetDisplayAlerts
                    alertsEnabled={alertsEnabled}
                    setAlertsEnabled={setAlertsEnabled}
                  />
                  <Divider borderColor={"grey"} />
                  <SelectDefaultCompany
                    userInfo={userInfo}
                    companies={companies}
                    setDefaultCompany={setDefaultCompany}
                    defaultCompany={defaultCompany}
                  />
                  <Divider borderColor={"grey"} />
                  <Button
                    colorScheme="red"
                    onClick={handleClearLocalStorage}
                    variant="ghost"
                  >
                    Clear Local Storage
                  </Button>
                </VStack>
              </GridItem>
            </Grid>
          </DrawerBody>
          <DrawerFooter>
            <HStack>
              {["ADMIN", "SUPER_ADMIN"].includes(userInfo.userType) ? (
                <Button
                  colorScheme="green"
                  variant="ghost"
                  onClick={() => {
                    navigate("/application/admin");
                    onClose();
                  }}
                >
                  Admin panel
                </Button>
              ) : (
                <></>
              )}

              <Button
                colorScheme="purple"
                variant="ghost"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </HStack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
