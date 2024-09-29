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
  Container,
  GridItem,
  Grid,
  Switch,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { UIProps } from "../../../../../config/config";
import { useAuth0 } from "@auth0/auth0-react";

export const UserSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout} = useAuth0();
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
              <>Profile</>
              <Button onClick={() => logout()}>Logout</Button>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <Grid templateRows="2fr 1fr 8fr">
              <GridItem>
                <Container>
                  <Grid templateColumns="1fr 2fr">
                    <GridItem>
                      <Switch />
                    </GridItem>
                    <GridItem>
                      <Text>Alerts</Text>
                    </GridItem>
                  </Grid>
                </Container>
              </GridItem>
              <GridItem>Settings</GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
