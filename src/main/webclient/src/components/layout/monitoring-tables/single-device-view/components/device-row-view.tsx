import { Box, HStack, Td, Tr } from "@chakra-ui/react";
import {
  IMonitoringDevice,
  deviceStatus,
  deviceType,
} from "../../../../../types/deviceModel";
import { StatusDotIndicator } from "../../../status-dot-indicator";
import { useNavigate } from "react-router-dom";
import { UIProps } from "../../../../../config/config";

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
  const rowBackgroundColor =
    device.status === deviceStatus.active
      ? UIProps.colors.table.active
      : UIProps.colors.table.disabled;
  return (
    <Tr
      backgroundColor={rowBackgroundColor}
      key={device.id}
      onClick={navigateToDeviceDetailsPage}
      _hover={{ cursor: "pointer" }}
    >
      <Td>
        <>{device.id}</>
      </Td>
      <Td>{device.lastPinged.toString()}</Td>
      <Td>
        <Box marginLeft="16px">
          <StatusDotIndicator status={device.status} />
        </Box>
      </Td>
    </Tr>
  );
};
