import { Accordion } from "@chakra-ui/react";
import { DeviceModel } from "../../../../types/deviceModel";
import { BridgeRowView } from "./components/bridge-row-view";

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
  if (model.getDevicesCount()) {
    const filteredBridges = model.bridges.filter(
      (bridge) =>
        bridge.id.includes(deviceIdFilter) ||
        bridge.getChildDevicesCountMachingFilterPattern(deviceIdFilter) > 0
    );

    const sortedBridges = [...filteredBridges].sort((a, b) =>
      isSorted ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );

    return (
      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        {sortedBridges.map((bridge) => {
          return (
            <BridgeRowView
              bridge={bridge}
              inactiveOnly={inactiveOnly}
              deviceIdFilter={deviceIdFilter}
              isSorted={isSorted}
            />
          );
        })}
      </Accordion>
    );
  } else {
    return <>No devices to display</>;
  }
};
