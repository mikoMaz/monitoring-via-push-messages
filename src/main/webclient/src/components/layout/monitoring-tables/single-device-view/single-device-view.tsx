import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { deviceStatus, IMonitoringDevice } from "../../../../types/deviceModel";
import { DeviceRowView } from "./components/device-row-view";

interface ISingleDeviceView {
  model: IMonitoringDevice[];
  inactiveOnly: boolean;
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
}: ISingleDeviceView) => {
  if (model.length) {
    if (inactiveOnly) {
      const inactiveDevices = model.filter((d) => {
        return d.status !== deviceStatus.active;
      });
      return (
        <TableContainer borderRadius="lg">
          <Table variant="simple" bg="white" size="sm">
            <TableHead />
            <Tbody>
              <>
                {inactiveDevices.map((device) => {
                  return <DeviceRowView {...device} />;
                })}
              </>
            </Tbody>
          </Table>
        </TableContainer>
      );
    } else {
      return (
        <TableContainer borderRadius="lg">
          <Table variant="simple" bg="white" size="sm">
            <TableHead />
            <Tbody>
              <>
                {model.map((device) => {
                  return <DeviceRowView {...device} />;
                })}
              </>
            </Tbody>
          </Table>
        </TableContainer>
      );
    }
  } else {
    return <>No devices to display</>
  }
};
