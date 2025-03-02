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
import { IHistoryChartData } from "../../../types/IHistoryChartData";

interface IDetailsModal {
  isOpen: boolean;
  onClose: () => void;
  data: IHistoryChartData;
}

export const DetailsModal = ({ isOpen, onClose, data }: IDetailsModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Devices active time on {data.timestamp}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Text>all devices in the company {data.allDevices}</Text>
            <Heading size="sm">Number of devices by status</Heading>
            <Text>active: {data.active}</Text>
            <Text>inactive: {data.inactive}</Text>
            <Text>disabled: {data.disabled}</Text>
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
