import { Box, Button, HStack, Td, Tr } from "@chakra-ui/react";
import {
  IMonitoringDevice,
  deviceType,
} from "../../../../../types/deviceModel";
import { StatusDotIndicator } from "../../../status-dot-indicator";
import { useNavigate } from "react-router-dom";

export const DeviceRowView = (device: IMonitoringDevice) => {
  const navigate = useNavigate();
  const navigateToDeviceDetailsPage = () => {
    switch (device.deviceType) {
      case deviceType.sensor:
        navigate({
          pathname: "/monitoring/sensor",
          search: new URLSearchParams(`id=${device.id}`).toString(),
        });
        break;
      case deviceType.gateway:
        navigate({
          pathname: "/monitoring/gateway",
          search: new URLSearchParams(`id=${device.id}`).toString(),
        });
        break;
      case deviceType.bridge:
        navigate({
          pathname: "/monitoring/bridge",
          search: new URLSearchParams(`id=${device.id}`).toString(),
        });
        break;
    }
  };
  return (
    <Tr
      key={device.id}
      onClick={navigateToDeviceDetailsPage}
      _hover={{ cursor: "pointer" }}
    >
      <Td>
        <HStack>
          <StatusDotIndicator status={device.status} />
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
