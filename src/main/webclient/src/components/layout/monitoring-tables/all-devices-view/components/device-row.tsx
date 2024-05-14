import { Td, Tr } from "@chakra-ui/react";
import { IMonitoringDevice } from "../../../../../types/deviceModel";
import { StatusDotIndicator } from "../../../status-dot-indicator";

export const DeviceRow = (device: IMonitoringDevice) => {
  return (
    <Tr key={device.id}>
      <Td>{device.id}</Td>
      <Td>{device.lastPinged.toString()}</Td>
      <Td>
        <StatusDotIndicator status={device.status} />
      </Td>
    </Tr>
  );
};
