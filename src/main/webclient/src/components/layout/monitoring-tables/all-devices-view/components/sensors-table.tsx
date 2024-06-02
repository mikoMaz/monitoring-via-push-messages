import {
  Card,
  CardBody,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Sensor } from "../../../../../types/deviceModel";
import { DeviceRow } from "./device-row";

interface ISensorsTableProps {
  sensors: Sensor[];
}

export const SensorsTable = ({ sensors }: ISensorsTableProps) => {
  if (sensors.length) {
    return (
      <TableContainer borderRadius="lg">
        <Table variant="striped" bg="white">
          <Thead>
            <Tr>
              <Th>Device ID</Th>
              <Th>Last Ping</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            <>
              {sensors.map((sensor) => {
                return <DeviceRow {...sensor} />;
              })}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <Card align="center">
        <CardBody>
          <HStack>
            <Text fontSize="md">No data</Text>
          </HStack>
        </CardBody>
      </Card>
    );
  }
};
