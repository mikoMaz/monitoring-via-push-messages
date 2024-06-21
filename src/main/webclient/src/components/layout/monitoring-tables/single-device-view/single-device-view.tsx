import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { IMonitoringDevice } from "../../../../types/deviceModel";
import { DeviceRowView } from "./components/device-row-view";

export const SingleDeviceView = ({ model }: { model: IMonitoringDevice[] }) => {
  return (
    <TableContainer borderRadius="lg">
      <Table variant="simple" bg="white" size="sm">
        <Thead>
          <Tr>
            <Th>Device ID</Th>
            <Th>Last Ping</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
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
};
