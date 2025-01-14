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

interface IUserSidebar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  userInfo: IUserInfoResponse;
  apiClient: APIClient;
  accessToken: string;
}

const DEFAULT_COMPANIES_LABEL = "Select company";

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
  const [companySelect, setCompanySelect] = useState<number | null>(null);

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

  const handleCompanyChange = (event: any) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setCompanySelect(isNaN(selectedCompanyId) ? null : selectedCompanyId);
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
            <>{user?.mail ?? user?.nickname ?? user?.name}</>
          </DrawerHeader>
          <DrawerBody>
            <Grid templateRows="2fr auto auto auto">
              <GridItem mb={8}>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="alerts-switch" mb="0">
                    Alerts
                  </FormLabel>
                  <Switch
                    id="alerts-switch"
                    colorScheme="primary"
                    isChecked={alertsEnabled}
                    onChange={(e) => {
                      setAlertsEnabled(!alertsEnabled);
                    }}
                  />
                </FormControl>
              </GridItem>
              <GridItem mb={4}>
                <Heading size="md">Settings</Heading>
              </GridItem>
              <GridItem>
                <VStack spacing={4} alignItems="flex-start">
                  <Button
                    colorScheme="red"
                    onClick={handleClearLocalStorage}
                    variant="ghost"
                  >
                    Clear Local Storage
                  </Button>
                  {["ADMIN", "SUPER_ADMIN"].includes(userInfo.userType) ? (
                    <Select
                      placeholder={DEFAULT_COMPANIES_LABEL}
                      value={companySelect ?? undefined}
                      onChange={handleCompanyChange}
                      bg="transparent"
                      border="none"
                      _hover={{
                        bg: "green.50",
                      }}
                      _focus={{
                        boxShadow: "none",
                        bg: "green.50",
                      }}
                      _active={{
                        bg: "green.50",
                      }}
                    >
                      {companies.map((company) => (
                        <option
                          key={company.companyId}
                          value={company.companyId}
                        >
                          {company.companyName}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <></>
                  )}
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
