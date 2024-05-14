import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Sensor } from "../../../../../types/deviceModel";
import { DeviceRow } from "./device-row";

interface ISensorsTable {
  sensors: Sensor[];
}

export const SensorsTable = ({ sensors }: ISensorsTable) => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Device ID</Th>
            <Th>Last Ping</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sensors.map((sensor) => (
            <DeviceRow {...sensor} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
