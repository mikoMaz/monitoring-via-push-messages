import { HStack, Td, Tr } from "@chakra-ui/react";
import { IMonitoringDevice } from "../../../../../types/deviceModel";
import { StatusDotIndicator } from "../../../status-dot-indicator";

export const DeviceRowView = (device: IMonitoringDevice) => {
  return (
    <Tr key={device.id}>
      <Td>
        <HStack>
          <StatusDotIndicator status={device.status}/>
          <>{device.id}</>
        </HStack>
      </Td>
      <Td>{device.lastPinged.toString()}</Td>
      <Td>
        <StatusDotIndicator status={device.status} />
      </Td>
    </Tr>
  );
};
