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
  Switch,
  Button,
  FormControl,
  FormLabel,
  DrawerFooter,
  Heading,
  HStack,
  Select,
  VStack,
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

interface IUserSidebar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  userInfo: IUserInfoResponse;
  apiClient: APIClient;
  accessToken: string;
}

export const UserSidebar = ({
  alertsEnabled,
  setAlertsEnabled,
  userInfo,
  apiClient,
  accessToken,
}: IUserSidebar) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, user } = useAuth0();

  const handleClearLocalStorage = () => {
    LocalStorageManager.clearLocalStorage();
    window.location.reload();
  };

  const [companies, setCompanies] = useState<ICompanyDto[]>([]);

  const refreshCompaniesList = async () => {
    await apiClient
      .getAllCompanies(accessToken)
      .then((companiesList) => {
        setCompanies(companiesList);
      })
      .catch((error) => {
        console.error("Companies fetching failed " + error.message);
        setCompanies([]);
      });
  };

  useEffect(() => {
    refreshCompaniesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, apiClient]);

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
            <>{userInfo?.email.split("@")[0] ?? user?.nickname}</>
          </DrawerHeader>
          <DrawerBody>
            <Grid templateRows="2fr auto auto auto">
              <GridItem mb={4}>
                <Heading size="md">Settings</Heading>
              </GridItem>
              <GridItem mb={8}>
                <SetDisplayAlerts
                  alertsEnabled={alertsEnabled}
                  setAlertsEnabled={setAlertsEnabled}
                />
              </GridItem>
              <GridItem>
                <VStack spacing={4} alignItems="flex-start">
                  <SelectDefaultCompany
                    userInfo={userInfo}
                    companies={companies}
                    setDefaultCompany={(comp?: ICompanyDto) => {}}
                  />
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
