import { useEffect, useState } from "react";
import {
  DeviceModel,
  AllDevicesUptimeJson,
  emptyAllDevicesUptimeJson,
  returnDevicesArrayFromAllDevicesUptimeJson,
} from "../../../types/deviceModel";
import { APIClient } from "../../../api/api-client";
import { Card, CardBody, Center, VStack } from "@chakra-ui/react";
import { CurrentChart } from "../../dashboard-page/components/current-chart";
import { getEmptyPreset } from "../../../types/chartTemplate";
import { RecentChart } from "../../dashboard-page/components/recent-chart";

interface IPreviewChartsContainer {
  apiClient: APIClient;
  secret: string;
  context: string;
}

const ChartContainer = ({ chart }: { chart: JSX.Element }) => {
  return (
    <Card variant="filled" bg="whiteAlpha.500" align="center">
      <CardBody>
        <Center>{chart}</Center>
      </CardBody>
    </Card>
  );
};

export const PreviewChartsContainer = ({
  secret,
  context,
  apiClient,
}: IPreviewChartsContainer) => {
  const baselineChartModel = getEmptyPreset().chartModel;

  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel()
  );

  const [devicesUptimeJson, setDevicesUptimeJson] =
    useState<AllDevicesUptimeJson>(emptyAllDevicesUptimeJson);

  const uptimeValuesAllDevices =
    returnDevicesArrayFromAllDevicesUptimeJson(devicesUptimeJson);

  useEffect(() => {
    apiClient
      .getPreviewDeviceModel(secret, context)
      .then((model) => {
        setDeviceModel(model);
      })
      .catch((error: any) => {
        console.error(error.message);
        setDeviceModel(new DeviceModel());
      });
    apiClient
      .getPreviewDevicesHistory(secret, context)
      .then((uptimeValues) => {
        setDevicesUptimeJson(uptimeValues);
      })
      .catch((error: any) => {
        console.error(error.message);
        setDevicesUptimeJson(emptyAllDevicesUptimeJson);
      });
  }, [secret, context, apiClient]);

  if (secret) {
    return (
      <Center>
        <VStack>
          <ChartContainer
            chart={
              <CurrentChart
                model={deviceModel}
                devicesHistoryValues={uptimeValuesAllDevices}
                {...baselineChartModel}
              />
            }
          />
          <ChartContainer
            chart={
              <RecentChart
                model={deviceModel}
                devicesHistoryValues={uptimeValuesAllDevices}
                {...baselineChartModel}
              />
            }
          />
        </VStack>
      </Center>
    );
  } else {
    return <>Secret validation failed</>;
  }
};
