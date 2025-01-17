import { useParams } from "react-router-dom";
import { UIProps } from "../../config/config";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Progress,
  Stack,
  Text,
  VStack,
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
import { IAPIClient } from "../../api/api-client";
import { ICompanyDto } from "../../types/ICompanyDto";

export type monitoringDeviceType = "sensor" | "gateway" | "bridge" | "other";

interface IMonitoringDevicePage {
  apiClient: IAPIClient;
  model: DeviceModel;
  accessToken: string;
  companyId: ICompanyDto | undefined;
}

export const MonitoringDevicePage = ({
  apiClient,
  model,
  accessToken,
  companyId,
}: IMonitoringDevicePage) => {
  const [activeTime, setActiveTime] = useState<number | undefined>();
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
    const fetchDeviceActiveTime = async (
      deviceId: string,
      companyId: ICompanyDto | undefined
    ) => {
      try {
        if (!companyId) {
          throw new Error("CompanyId is missing");
        }
        var time = await apiClient.getDeviceUptime(
          companyId.companyId.toString(),
          deviceId,
          accessToken
        );
        setActiveTime(time);
      } catch (e: any) {
        console.log("Couldn't fetch device history value " + e.message);
        setActiveTime(undefined);
      }
    };

    if (selectedDevice !== DeviceModel.getPlaceholderDevice()) {
      fetchDeviceActiveTime(selectedDevice.id, companyId);
    }
  }, [selectedDevice, apiClient, accessToken, companyId]);

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
          <Accordion defaultIndex={[0, 1]} allowMultiple allowToggle>
            <AccordionItem>
              <CustomAccordionButton
                title={true}
                label={`${capitalizeFirstLetter(
                  deviceType[selectedDevice.deviceType]
                )} ${selectedDevice.id}`}
              />

              <AccordionPanel>
                <Text size="sm" marginBottom={2}>
                  Device % activity in the lifetime
                </Text>
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
                <DeviceDetailsTable device={selectedDevice} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </Box>
  );
};
