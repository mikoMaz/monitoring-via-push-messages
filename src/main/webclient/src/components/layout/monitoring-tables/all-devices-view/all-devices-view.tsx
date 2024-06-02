import { Accordion } from "@chakra-ui/react";
import { DeviceModel } from "../../../../types/deviceModel";
import { BridgeRowView } from "./components/bridge-row-view";

export const AllDevicesView = ({ model }: { model: DeviceModel }) => {
  return (
    <Accordion defaultIndex={[0, 1]} allowMultiple>
      {model.bridges.map((bridge) => {
        return <BridgeRowView bridge={bridge} />;
      })}
    </Accordion>
  );
};
