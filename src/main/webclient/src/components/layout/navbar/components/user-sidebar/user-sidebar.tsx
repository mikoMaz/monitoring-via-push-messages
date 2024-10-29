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
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { UIProps } from "../../../../../config/config";
import { useAuth0 } from "@auth0/auth0-react";

interface IUserSidebar {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
}

export const UserSidebar = ({
  alertsEnabled,
  setAlertsEnabled,
}: IUserSidebar) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, user } = useAuth0();
  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<Avatar size="sm" />}
        aria-label={"Profile"}
        colorScheme={UIProps.colors.accent}
        paddingTop="10px"
        paddingLeft="40px"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <>{user?.mail ?? user?.nickname ?? user?.name}</>
              <Button onClick={() => logout()}>Logout</Button>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <Grid templateRows="2fr 1fr 8fr">
              <GridItem>
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
              <GridItem>Settings</GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
