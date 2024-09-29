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
} from "@chakra-ui/react";
import { IUIProps } from "../../../../../types/projectTypes";
import { UIProps } from "../../../../../config/config";

export const UserSidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <DrawerHeader>Profile</DrawerHeader>

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
