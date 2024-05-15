import { DeviceModel } from "../../../../types/deviceModel";
import { BridgeRowView } from "./components/bridge-row-view";

export const AllDevicesView = (model: DeviceModel) => {

  return (
    <>
      {model.bridges.map((bridge) => {
        return <BridgeRowView {...bridge} />;
      })}
    </>
  );
};
