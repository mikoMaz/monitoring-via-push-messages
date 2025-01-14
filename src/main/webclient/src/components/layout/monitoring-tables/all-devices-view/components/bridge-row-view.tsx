import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Stack,
} from "@chakra-ui/react";
import {
  Bridge,
  deviceStatus,
  deviceType,
} from "../../../../../types/deviceModel";
import { GatewayRowView } from "./gateway-row-view";
import { StatusDotIndicator } from "../../../status-dot-indicator";
import { DeviceDetailsLink } from "./device-details-link";
import { SensorsTable } from "./sensors-table";

interface IBridgeRowViewProps {
  bridge: Bridge;
  inactiveOnly: boolean;
  deviceIdFilter: string;
  isSorted: boolean;
}

export const BridgeRowView = ({
  bridge,
  inactiveOnly,
  deviceIdFilter,
  isSorted,
}: IBridgeRowViewProps) => {
  const filteredGateways = bridge.gateways.filter(
    (gateway) =>
      gateway.id.includes(deviceIdFilter) ||
      gateway.getChildDevicesCountMachingFilterPattern(deviceIdFilter) > 0
  );

  const sortedGateways = [...filteredGateways].sort((a, b) =>
    isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );

  const filteredSensors = bridge.sensors.filter((gateway) =>
    gateway.id.includes(deviceIdFilter)
  );

  const sortedSensors = [...filteredSensors].sort((a, b) =>
    isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
  );

  const BridgeButton = () => {
    return (
      <>
        <Box as="span" flex="1" textAlign="left">
          <HStack>
            <StatusDotIndicator status={bridge.status} />
            <DeviceDetailsLink type={deviceType.bridge} id={bridge.id} />
          </HStack>
        </Box>
        <AccordionIcon />
      </>
    );
  };

  if (
    inactiveOnly &&
    (bridge.status !== deviceStatus.active &&
      (bridge.containAnyInactiveGateway() ||
      bridge.containAnyInactiveSensors()))
  ) {
    return (
      <AccordionItem key={bridge.id}>
        <AccordionButton>
          <BridgeButton />
        </AccordionButton>
        <AccordionPanel>
          <Stack>
            {sortedGateways.map((gateway) => (
              <GatewayRowView
                gateway={gateway}
                inactiveOnly={inactiveOnly}
                deviceIdFilter={deviceIdFilter}
                isSorted={isSorted}
              />
            ))}
            {sortedSensors.length ? (
              <SensorsTable
                sensors={sortedSensors}
                inactiveOnly={inactiveOnly}
                deviceIdFilter={deviceIdFilter}
                isSorted={isSorted}
              />
            ) : (
              <></>
            )}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    );
  } else {
    return (
      <AccordionItem key={bridge.id}>
        <AccordionButton>
          <BridgeButton />
        </AccordionButton>
        <AccordionPanel>
        <Stack>
            {sortedGateways.map((gateway) => (
              <GatewayRowView
                gateway={gateway}
                inactiveOnly={inactiveOnly}
                deviceIdFilter={deviceIdFilter}
                isSorted={isSorted}
              />
            ))}
            {sortedSensors.length ? (
              <SensorsTable
                sensors={sortedSensors}
                inactiveOnly={inactiveOnly}
                deviceIdFilter={deviceIdFilter}
                isSorted={isSorted}
              />
            ) : (
              <></>
            )}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    );
  }
};
