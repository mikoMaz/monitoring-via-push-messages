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
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { IHistoryValue } from "../../../types/IHistoryValues";

interface IDetailsModal {
  isOpen: boolean;
  onClose: () => void;
  data: IHistoryValue;
}

const convertTimestamp = (time: number): string => {
  const date = new Date(time * 1000);
  return date.toLocaleString();
};

export const DetailsModal = ({ isOpen, onClose, data }: IDetailsModal) => {
  const incidentDevices = data.incidents || [];
  const [selectedDevice, setSelectedDevice] = useState<string | null>(
    incidentDevices.length > 0 ? incidentDevices[0].Id : null
  );

  const selectedIncidents =
    incidentDevices.find((device) => device.Id === selectedDevice)?.incidents ||
    [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent borderRadius="lg" boxShadow="xl">
        <ModalHeader>Devices active time on {data.timestamp}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Box p={4} bg="gray.100" borderRadius="md">
              <Heading size="sm">Number of devices by status</Heading>
              <Text>Active: {data.active}</Text>
              <Text>Disabled: {data.disabled}</Text>
            </Box>

            <Box p={4} bg="gray.50" borderRadius="md">
              <Heading size="sm">
                Total Devices with Incidents: {incidentDevices.length}
              </Heading>
            </Box>

            {incidentDevices.length > 0 && (
              <Box>
                <Heading size="sm" mb={2}>
                  Select Device
                </Heading>
                <Select
                  value={selectedDevice || ""}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                >
                  {incidentDevices.map((device) => (
                    <option key={device.Id} value={device.Id}>
                      {device.Id}
                    </option>
                  ))}
                </Select>
              </Box>
            )}

            {selectedIncidents.length > 0 && (
              <Box>
                <Heading size="sm" mb={2}>
                  Incident Timestamps
                </Heading>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Start</Th>
                      <Th>End</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {selectedIncidents.map((incident, index) => (
                      <Tr key={index}>
                        <Td>{convertTimestamp(incident.Start)}</Td>
                        <Td>{convertTimestamp(incident.End)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
