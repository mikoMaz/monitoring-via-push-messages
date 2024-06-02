import { Box, Td, Tr } from "@chakra-ui/react";
import { IMonitoringDevice } from "../../../../../types/deviceModel";
import { StatusDotIndicator } from "../../../status-dot-indicator";

export const DeviceRow = (device: IMonitoringDevice) => {
  return (
    <Tr key={device.id}>
      <Td>{device.id}</Td>
      <Td>{device.lastPinged.toString()}</Td>
      <Td>
        <Box marginLeft="16px">
          <StatusDotIndicator status={device.status} />
        </Box>
      </Td>
    </Tr>
  );
};
