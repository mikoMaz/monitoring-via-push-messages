import { useParams } from "react-router-dom";
import { UIProps } from "../../config/config";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  GridItem,
  Progress,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  DeviceModel,
  IMonitoringDevice,
  deviceType,
} from "../../types/deviceModel";
import { CustomAccordionButton } from "./components/custom-accordion-buttons";
import { capitalizeFirstLetter } from "../../types/projectTypes";
import { DeviceDetailsTable } from "./components/device-details-table";
import { APIClient } from "../../api/api-client";

export type monitoringDeviceType = "sensor" | "gateway" | "bridge" | "other";

export const MonitoringDevicePage = (model: DeviceModel) => {
  const [activeTime, setActiveTime] = useState<number>(0);
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

  useEffect(() => {
    const fetchDeviceActiveTime = async (type: deviceType, id: string) => {
      var time = await APIClient.getDeviceUptime(1, id);
      setActiveTime(time);
    };

    if (selectedDevice !== DeviceModel.getPlaceholderDevice()) {
      fetchDeviceActiveTime(selectedDevice.deviceType, selectedDevice.id);
    }
  }, [selectedDevice]);

  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={ui.colors.background}
      boxShadow="inner"
    >
      <Grid>
        <GridItem
          className="chart-details-accordion"
          marginTop="28px"
          marginBottom="28px"
        >
          <Accordion defaultIndex={[0]} allowMultiple allowToggle>
            <AccordionItem>
              <CustomAccordionButton
                title={true}
                label={`${capitalizeFirstLetter(
                  deviceType[selectedDevice.deviceType]
                )} ${selectedDevice.id}`}
              />

              <AccordionPanel>
                <Progress
                  value={activeTime}
                  colorScheme="deviceActiveTime"
                  height="40px"
                  backgroundColor={ui.colors.table.disabled}
                />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <CustomAccordionButton label="Device details" />
              <AccordionPanel>
                <DeviceDetailsTable />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <CustomAccordionButton label="History" />
              <AccordionPanel>History</AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </Box>
  );
};
