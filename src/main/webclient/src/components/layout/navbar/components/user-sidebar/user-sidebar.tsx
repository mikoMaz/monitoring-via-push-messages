import {
  Avatar,
  IconButton,
  Drawer,
  DrawerOverlay,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Input,
  DrawerFooter,
  Button,
  DrawerHeader,
} from "@chakra-ui/react";
import { IUIProps } from "../../../../app-main/app-main";

export const UserSidebar = ({ ...ui }: IUIProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<Avatar size="sm" />}
        aria-label={"Profile"}
        colorScheme={ui.colors.accent}
        paddingTop="10px"
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
