import { Accordion, Stack } from "@chakra-ui/react";
import { DeviceModel } from "../../../../types/deviceModel";
import { BridgeRowView } from "./components/bridge-row-view";
import { GatewayRowView } from "./components/gateway-row-view";
import { SensorsTable } from "./components/sensors-table";

interface IAllDevicesView {
  model: DeviceModel;
  inactiveOnly: boolean;
  deviceIdFilter: string;
  isSorted: boolean;
}

export const AllDevicesView = ({
  model,
  inactiveOnly,
  deviceIdFilter,
  isSorted,
}: IAllDevicesView) => {
  const defaultOpen = model.bridges
    .map((b, ind) => {
      return ind;
    })
    .concat(
      model.gateways.map((b, ind) => {
        return ind;
      })
    );

  if (model.getDevicesCount()) {
    const filteredBridges = model.bridges.filter(
      (bridge) =>
        bridge.id.includes(deviceIdFilter) ||
        bridge.getChildDevicesCountMachingFilterPattern(deviceIdFilter) > 0
    );

    const filteredGateways = model.gateways.filter(
      (gateway) =>
        gateway.id.includes(deviceIdFilter) ||
        gateway.getChildDevicesCountMachingFilterPattern(deviceIdFilter) > 0
    );

    const filteredSensors = model.sensors.filter((sensor) =>
      sensor.id.includes(deviceIdFilter)
    );

    const sortedBridges = [...filteredBridges].sort((a, b) =>
      isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );

    const sortedGateways = [...filteredGateways].sort((a, b) =>
      isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );

    const sortedSensors = [...filteredSensors].sort((a, b) =>
      isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );

    return (
      <Stack>
        <Accordion defaultIndex={defaultOpen} allowMultiple>
          {sortedBridges.length ? (
            sortedBridges.map((bridge) => {
              return (
                <BridgeRowView
                  bridge={bridge}
                  inactiveOnly={inactiveOnly}
                  deviceIdFilter={deviceIdFilter}
                  isSorted={isSorted}
                />
              );
            })
          ) : (
            <></>
          )}
        </Accordion>
        {sortedGateways.length ? (
          sortedGateways.map((gateway) => {
            return (
              <GatewayRowView
                gateway={gateway}
                inactiveOnly={inactiveOnly}
                deviceIdFilter={deviceIdFilter}
                isSorted={isSorted}
              />
            );
          })
        ) : (
          <></>
        )}
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
    );
  } else {
    return <>No devices to display</>;
  }
};
