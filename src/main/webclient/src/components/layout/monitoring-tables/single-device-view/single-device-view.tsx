import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { deviceStatus, IMonitoringDevice } from "../../../../types/deviceModel";
import { DeviceRowView } from "./components/device-row-view";

interface ISingleDeviceViewProps {
  model: IMonitoringDevice[];
  inactiveOnly: boolean;
  deviceIdFilter: string;
}

const TableHead = () => {
  return (
    <Thead>
      <Tr>
        <Th>Device ID</Th>
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
}: ISingleDeviceViewProps) => {
  const filteredDevices = model.filter((device) => {
    const matchesDeviceId = device.id.toString().includes(deviceIdFilter);
    const matchesStatus = inactiveOnly
      ? device.status !== deviceStatus.active
      : true;
    return matchesDeviceId && matchesStatus;
  });

  return (
    <TableContainer borderRadius="lg">
      <Table variant="simple" bg="white" size="sm">
        <TableHead />
        <Tbody>
          {filteredDevices.length ? (
            filteredDevices.map((device) => (
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
