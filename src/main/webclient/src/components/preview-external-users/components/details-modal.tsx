import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

interface IDetailsModal {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export const DetailsModal = ({ isOpen, onClose, date }: IDetailsModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Devices active time on {date}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Heading size="sm">Number of devices by status</Heading>
            <Text>active</Text>
            <Text>inactive</Text>
            <Text>disabled</Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
