import { useParams, useSearchParams } from "react-router-dom";
import { UIProps } from "../../config/config";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
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
      <Grid>
        <GridItem
          className="chart-details-accordion"
          marginTop="28px"
          marginBottom="28px"
        >
          <Accordion defaultIndex={[0, 1, 2]} allowMultiple allowToggle>
            <AccordionItem>
              <CustomAccordionButton
                label={`${capitalizeFirstLetter(
                  deviceType[selectedDevice.deviceType]
                )} ${selectedDevice.id}`}
              />

              <AccordionPanel>Chart</AccordionPanel>
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
