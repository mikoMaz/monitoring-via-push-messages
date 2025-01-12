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
} from "@chakra-ui/react";
import { UIProps } from "../../../../../config/config";
import { useAuth0 } from "@auth0/auth0-react";
import { LocalStorageManager } from "../../../../../types/localStorageMenager";
import { useNavigate } from "react-router-dom";
import { IUserInfoResponse } from "../../../../../types/IUserInfoResponse";

interface IUserSidebar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
  userInfo: IUserInfoResponse;
}

export const UserSidebar = ({
  alertsEnabled,
  setAlertsEnabled,
  userInfo,
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
                <Button
                  colorScheme="red"
                  onClick={handleClearLocalStorage}
                  variant="ghost"
                >
                  Clear Local Storage
                </Button>
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
