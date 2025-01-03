// AllDevicesView.tsx
import { Accordion } from "@chakra-ui/react";
import { DeviceModel } from "../../../../types/deviceModel";
import { BridgeRowView } from "./components/bridge-row-view";

interface IAllDevicesView {
  model: DeviceModel;
  inactiveOnly: boolean;
  deviceIdFilter: string;
}

export const AllDevicesView = ({
  model,
  inactiveOnly,
  deviceIdFilter,
}: IAllDevicesView) => {
  if (model.getDevicesCount()) {
    const filteredBridges = model.bridges.filter(
      (bridge) =>
        bridge.id.includes(deviceIdFilter) ||
        bridge.getChildDevicesCountMachingFilterPattern(deviceIdFilter) > 0
    );
    return (
      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        {filteredBridges.map((bridge) => {
          return (
            <BridgeRowView
              bridge={bridge}
              inactiveOnly={inactiveOnly}
              deviceIdFilter={deviceIdFilter}
            />
          );
        })}
      </Accordion>
    );
  } else {
    return <>No devices to display</>;
  }
};
