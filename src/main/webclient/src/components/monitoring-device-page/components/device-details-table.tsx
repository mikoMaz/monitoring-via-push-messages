import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { IMonitoringDevice, deviceType } from '../../../types/deviceModel';

export const DeviceDetailsTable = ({
  device,
}: {
  device: IMonitoringDevice;
}) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Th>Device id</Th>
            <Th>{device.id}</Th>
          </Tr>
          <Tr>
            <Th>Status</Th>
            <Th>{device.status ? "active" : "disabled"}</Th>
          </Tr>
          <Tr>
            <Th>Last pinged</Th>
            <Th>{device.lastPinged.toISOString()}</Th>
          </Tr>
          <Tr>
            <Th>Device type</Th>
            <Th>{deviceType[device.deviceType]}</Th>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
