import { useEffect, useState } from "react";
import {
  DeviceModel,
  AllDevicesUptimeJson,
  emptyAllDevicesUptimeJson,
  returnDevicesArrayFromAllDevicesUptimeJson,
} from "../../../types/deviceModel";
import { APIClient } from "../../../api/api-client";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  useDisclosure,
  VStack,
  Text,
  Highlight,
  Link,
} from "@chakra-ui/react";
import { getEmptyPreset } from "../../../types/chartTemplate";
import {
  HistoryBatteryChart,
} from "../../dashboard-page/components/history-chart";
import {
  emptyHistoryChartData,
  IHistoryChartData,
} from "../../../types/IHistoryChartData";
import { CategoricalChartState } from "recharts/types/chart/types";
import { useNavigate } from "react-router-dom";
import { DetailsModal } from "./details-modal";
import { CalendarHeatmap } from "../../dashboard-page/components/calendar-heatmap-chart";

interface IPreviewChartsContainer {
  apiClient: APIClient;
  secret: string;
  context: string;
}

const ChartContainerWrapper = ({ chart }: { chart: JSX.Element }) => {
  return (
    <Card variant="filled" bg="whiteAlpha.500" align="center" marginX={20}>
      <CardBody>
        <Center>{chart}</Center>
      </CardBody>
    </Card>
  );
};

const ContextCard = ({
  context,
  deviceModel,
}: {
  context: string;
  deviceModel: DeviceModel;
}) => {
  return (
    <Box
      boxShadow="md"
      rounded="md"
      bg="background"
      marginX={10}
      marginTop={10}
    >
      <Card variant="filled" bg="whiteAlpha.900" align="center">
        <CardHeader>
          <Heading>{context}</Heading>
        </CardHeader>
        <CardBody>
          <VStack>
            <>
              {deviceModel.getDevicesCount()
                ? `Number of devices: ${deviceModel.getDevicesCount()}`
                : ""}
            </>
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
};

const CompanyCard = ({ context }: { context: string }) => {
  return (
    <Box
      boxShadow="md"
      rounded="md"
      bg="background"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card variant="filled" bg="whiteAlpha.900" align="center">
        <CardHeader>
          <Heading>{context}</Heading>
        </CardHeader>
      </Card>
    </Box>
  );
};

const DeviceModelCard = ({ deviceModel }: { deviceModel: DeviceModel }) => {
  return (
    <Box
      boxShadow="md"
      rounded="md"
      bg="background"
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card variant="filled" bg="whiteAlpha.900" align="center">
        <CardHeader>
          <VStack>
            <Text fontWeight="bold" size="md">
              <Highlight
                query="Number of devices: "
                styles={{ py: "1", fontWeight: "normal" }}
              >
                {deviceModel.getDevicesCount()
                  ? `Number of devices: ${deviceModel.getDevicesCount()}`
                  : ""}
              </Highlight>
            </Text>
            <Text fontWeight="bold">
              <Highlight
                query="Bridges: "
                styles={{ py: "1", fontWeight: "normal" }}
              >
                {deviceModel.getBridgesCount()
                  ? `Bridges: ${deviceModel.getBridgesCount()}`
                  : ""}
              </Highlight>
            </Text>
            <Text fontWeight="bold">
              <Highlight
                query="Gateways: "
                styles={{ py: "1", fontWeight: "normal" }}
              >
                {deviceModel.getGatewaysCount()
                  ? `Gateways: ${deviceModel.getGatewaysCount()}`
                  : ""}
              </Highlight>
            </Text>
            <Text fontWeight="bold">
              <Highlight
                query="Sensors: "
                styles={{ py: "1", fontWeight: "normal" }}
              >
                {deviceModel.getSensorsCount()
                  ? `Sensors: ${deviceModel.getSensorsCount()}`
                  : ""}
              </Highlight>
            </Text>
          </VStack>
        </CardHeader>
      </Card>
    </Box>
  );
};

const HistoryChartCard = ({
  historyChartData,
  batteryOnclick,
}: {
  historyChartData: IHistoryChartData[];
  batteryOnclick: (nextState: CategoricalChartState, event: any) => void;
}) => {
  return (
    <Box boxShadow="md" rounded="md" bg="background" padding={10} width="full">
      <Card variant="filled" bg="whiteAlpha.900">
        <CardHeader paddingX={0} paddingTop={0} paddingBottom={2}>
          <HStack justify="space-between" alignItems="stretch" w="full">
            <Text fontSize="xl" as="b">
              Devices Uptime History
            </Text>
            <Text fontSize="xl">Operational</Text>
          </HStack>
        </CardHeader>
        <CardBody padding={0}>
          <HistoryBatteryChart
            chartData={historyChartData}
            isPreview={true}
            dateOnClickOperation={batteryOnclick}
          />
        </CardBody>
        <CardFooter paddingX={0} paddingTop={2} paddingBottom={0}>
          <HStack justify="space-between" alignItems="stretch" w="full">
            <Text>90 days ago</Text>
            <Text>something uptime</Text>
            <Text>yesterday</Text>
          </HStack>
        </CardFooter>
      </Card>
    </Box>
  );
};

const HistoryCalendarCard = ({
  historyChartData,
}: {
  historyChartData: IHistoryChartData[];
}) => {
  return (
    <Box boxShadow="md" rounded="md" bg="background" padding={10} width="full">
      <Card variant="filled" bg="whiteAlpha.900">
        <CardHeader paddingX={0} paddingTop={0} paddingBottom={2}>
          <HStack justify="space-between" alignItems="stretch" w="full">
            <Text fontSize="xl" as="b">
              Devices Uptime History
            </Text>
            <Text fontSize="xl">Operational</Text>
          </HStack>
        </CardHeader>
        <CardBody padding={0}>
          <CalendarHeatmap chartData={historyChartData} />
        </CardBody>
        <CardFooter paddingX={0} paddingTop={2} paddingBottom={0}>
          <HStack justify="space-between" alignItems="stretch" w="full">
            <Text>90 days ago</Text>
            <Text>something uptime</Text>
            <Text>yesterday</Text>
          </HStack>
        </CardFooter>
      </Card>
    </Box>
  );
};

export const PreviewChartsContainer = ({
  secret,
  context,
  apiClient,
}: IPreviewChartsContainer) => {
  const navigate = useNavigate();

  const { isOpen, onOpen: openModal, onClose } = useDisclosure();

  const [selectedHistoryChartData, setSelectedHistoryChartData] =
    useState<IHistoryChartData>(emptyHistoryChartData);

  const baselineChartModel = getEmptyPreset().chartModel;

  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel()
  );

  const [devicesUptimeJson, setDevicesUptimeJson] =
    useState<AllDevicesUptimeJson>(emptyAllDevicesUptimeJson);

  const uptimeValuesAllDevices =
    returnDevicesArrayFromAllDevicesUptimeJson(devicesUptimeJson);

  const [historyChartData, setHistoryChartData] = useState<IHistoryChartData[]>(
    []
  );

  const [calendarChart, setCalendarChart] = useState<boolean>(false);

  useEffect(() => {
    apiClient
      .getPreviewDeviceModel(secret, context)
      .then((model) => {
        setDeviceModel(model);
        console.log(model);
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

    apiClient
      .getPreviewDataHistoryChart(secret, context)
      .then((data) => {
        setHistoryChartData(data);
        console.log(data);
      })
      .catch((error: any) => {
        console.error(error.message);
        setHistoryChartData([]);
      });
  }, [secret, context, apiClient]);

  const batteryOnclick = (nextState: CategoricalChartState, event: any) => {
    const index = nextState.activeLabel;
    console.log(index);
    console.log(nextState);
    if (index !== undefined) {
      setSelectedHistoryChartData(historyChartData[Number(index)]);
      // navigate({
      //   pathname: "details",
      //   search: new URLSearchParams(`date=${date}`).toString(),
      // });
      openModal();
    }
  };

  if (secret) {
    return (
      // <Center>
      //   <VStack align="stretch" spacing={4}>
      //     <ContextCard context={context} deviceModel={deviceModel} />
      //     {/* <ChartContainerWrapper
      //       chart={
      //         <CurrentChart
      //           model={deviceModel}
      //           devicesHistoryValues={uptimeValuesAllDevices}
      //           {...baselineChartModel}
      //         />
      //       }
      //     />
      //     <ChartContainerWrapper
      //       chart={
      //         <RecentChart
      //           model={deviceModel}
      //           devicesHistoryValues={uptimeValuesAllDevices}
      //           {...baselineChartModel}
      //         />
      //       }
      //     /> */}
      //     {/* <ChartContainerWrapper
      //       chart={<HistoryBatteryChart chartData={historyChartData} isPreview={true} />}
      //     /> */}
      //     <HistoryBatteryChart chartData={historyChartData} isPreview={true} />
      //   </VStack>
      // </Center>
      <>
        <Grid
          templateRows="auto 1fr"
          templateColumns="repeat(2, 1fr)"
          gap={10}
          margin={10}
        >
          <GridItem rowSpan={1} colSpan={1}>
            <VStack align="stretch" height="100%">
              <CompanyCard context={context}></CompanyCard>
            </VStack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <VStack align="stretch" height="100%">
              <DeviceModelCard deviceModel={deviceModel}></DeviceModelCard>
            </VStack>
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <VStack>
              <Text alignSelf="flex-end">
                Uptime over the past 90 days.{" "}
                <Link
                  color="green.500"
                  href="#"
                  onClick={() => setCalendarChart((prev) => !prev)}
                >
                  View historical uptime.
                </Link>
              </Text>
              {calendarChart ? (
                <HistoryCalendarCard historyChartData={historyChartData} />
              ) : (
                <HistoryChartCard
                  historyChartData={historyChartData}
                  batteryOnclick={batteryOnclick}
                />
              )}
            </VStack>
          </GridItem>
        </Grid>
        <DetailsModal
          data={selectedHistoryChartData}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
    );
  } else {
    return <>Secret validation failed</>;
  }
};
