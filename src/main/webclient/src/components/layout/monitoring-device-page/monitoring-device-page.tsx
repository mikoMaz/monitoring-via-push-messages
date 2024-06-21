import { useParams, useSearchParams } from "react-router-dom";
import { UIProps } from "../../../config/config";
import { Box, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  DeviceModel,
  IMonitoringDevice,
  deviceType,
} from "../../../types/deviceModel";

export type monitoringDeviceType = "sensor" | "gateway" | "bridge" | "other";

export const MonitoringDevicePage = (model: DeviceModel) => {
  const ui = UIProps;
  const { device } = useParams();
  const [selectedDevice, setSelectedDevice] = useState<IMonitoringDevice>(
    DeviceModel.getPlaceholderDevice()
  );


  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id) {
      switch (device) {
        case "sensor":
          const sensor = model
            .getSensorsArray()
            .find((element) => element.id === id);
          if (sensor) {
            setSelectedDevice({
              id: sensor.id,
              deviceType: deviceType.sensor,
              status: sensor.status,
              lastPinged: sensor.lastPinged,
            });
          }
          break;
        case "bridge":
          const bridge = model
            .getBridgesArray()
            .find((element) => element.id === id);
          if (bridge) {
            setSelectedDevice({
              id: bridge.id,
              deviceType: deviceType.bridge,
              status: bridge.status,
              lastPinged: bridge.lastPinged,
            });
          }
          break;
        case "gateway":
          const gateway = model
            .getGatewaysArray()
            .find((element) => element.id === id);
          if (gateway) {
            setSelectedDevice({
              id: gateway.id,
              deviceType: deviceType.gateway,
              status: gateway.status,
              lastPinged: gateway.lastPinged,
            });
          }
          break;
      }
    }
  }, [device, model]);
  
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={ui.colors.background}
      boxShadow="inner"
    >
      <Center>
        <>{device?.toString()}</>
      </Center>
    </Box>
  );
};