import { Accordion } from "@chakra-ui/react";
import { DeviceModel } from "../../../../types/deviceModel";
import { BridgeRowView } from "./components/bridge-row-view";

interface IAllDevicesView {
  model: DeviceModel;
  inactiveOnly: boolean;
}

export const AllDevicesView = ({ model, inactiveOnly }: IAllDevicesView) => {
  if (model.getDevicesCount()) {
    return (
      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        {model.bridges.map((bridge) => {
          return <BridgeRowView bridge={bridge} inactiveOnly={inactiveOnly} />;
        })}
      </Accordion>
    );
  } else {
    return <>No devices to display</>
  }
};
