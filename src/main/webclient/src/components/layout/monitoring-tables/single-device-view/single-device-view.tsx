import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { deviceStatus, IMonitoringDevice } from "../../../../types/deviceModel";
import { DeviceRowView } from "./components/device-row-view";
import { useState } from "react";

interface ISingleDeviceViewProps {
  model: IMonitoringDevice[];
  inactiveOnly: boolean;
  deviceIdFilter: string;
  isSorted: boolean;
}

const TableHead = () => {
  return (
    <Thead>
      <Tr>
        <Th>
          Device ID
        </Th>
        <Th>Last Ping</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
  );
};

export const SingleDeviceView = ({
  model,
  inactiveOnly,
  deviceIdFilter,
  isSorted,
}: ISingleDeviceViewProps) => {

  const filteredDevices = model.filter((device) => {
    const matchesDeviceId = device.id.toString().includes(deviceIdFilter);
    const matchesStatus = inactiveOnly
      ? device.status !== deviceStatus.active
      : true;
    return matchesDeviceId && matchesStatus;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) =>
    isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );
  return (
    <TableContainer borderRadius="lg">
      <Table variant="simple" bg="white" size="sm">
        <TableHead />
        <Tbody>
          {sortedDevices.length ? (
            sortedDevices.map((device) => (
              <DeviceRowView key={device.id} {...device} />
            ))
          ) : (
            <Tr>
              <td colSpan={3}>No devices to display</td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
