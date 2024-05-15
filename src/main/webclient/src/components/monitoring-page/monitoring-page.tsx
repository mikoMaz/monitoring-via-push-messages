import { createDeviceModel } from "../../types/deviceModel";
import { BridgeRowView } from "../layout/monitoring-tables/all-devices-view/components/bridge-row-view";

export const MonitoringPage = () => {
  // const testJson = "../../../../test/example.json";
  const testJson = `{
    "bridges": [
        {
            "id": "bridge1",
            "status": 0,
            "lastPinged": "2024-05-13T12:00:00Z",
            "gateways": [
                {
                    "id": "gateway1",
                    "status": 0,
                    "lastPinged": "2024-05-13T12:05:00Z",
                    "sensors": [
                        {
                            "id": "sensor1",
                            "status": 0,
                            "lastPinged": "2024-05-13T12:10:00Z"
                        }
                    ]
                }
            ]
        }
    ],
    "gateways": [],
    "sensors": []
}`;
  const data = JSON.parse(testJson);
  const deviceModel = createDeviceModel(data);
  return (
    <>
      {deviceModel.bridges.map((bridge) => {
        return <BridgeRowView {...bridge} />;
      })}
    </>
  );
};
