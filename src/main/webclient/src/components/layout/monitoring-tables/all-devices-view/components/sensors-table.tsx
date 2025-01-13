import {
  Card,
  CardBody,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { deviceStatus, Sensor } from "../../../../../types/deviceModel";
import { DeviceRowView } from "../../single-device-view/components/device-row-view";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

interface ISensorsTableProps {
  sensors: Sensor[];
  inactiveOnly: boolean;
  deviceIdFilter: string;
  isSorted: boolean;
}

const NoData = () => {
  return (
    <Card align="center">
      <CardBody>
        <HStack>
          <Text fontSize="md">No data</Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

const SensorsTableHead = ({ isSorted }: { isSorted: boolean }) => {
  return (
    <Thead>
      <Tr>
        <Th display="flex" alignItems="center">
          Device ID
          {isSorted ? (
            <ArrowDropUp fontSize="small" style={{ marginLeft: "8px" }} />
          ) : (
            <ArrowDropDown fontSize="small" style={{ marginLeft: "8px" }} />
          )}
        </Th>
        <Th>Last Ping</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
  );
};

export const SensorsTable = ({
  sensors,
  inactiveOnly,
  deviceIdFilter,
  isSorted,
}: ISensorsTableProps) => {
  const inactiveSensors = sensors.filter(
    (s) => s.status !== deviceStatus.active
  );
  if (inactiveOnly) {
    if (inactiveSensors.length) {
      return (
        <TableContainer borderRadius="lg">
          <Table variant="simple" bg="white">
            <SensorsTableHead isSorted={isSorted} />
            <Tbody>
              <>
                {inactiveSensors.map((sensor) => {
                  return <DeviceRowView {...sensor} />;
                })}
              </>
            </Tbody>
          </Table>
        </TableContainer>
      );
    } else {
      return <NoData />;
    }
  } else {
    if (sensors.length) {
      return (
        <TableContainer borderRadius="lg">
          <Table variant="simple" bg="white">
            <SensorsTableHead isSorted={isSorted} />
            <Tbody>
              <>
                {sensors.map((sensor) => {
                  return <DeviceRowView {...sensor} />;
                })}
              </>
            </Tbody>
          </Table>
        </TableContainer>
      );
    } else if (!sensors.length && deviceIdFilter) {
      return <></>;
    } else {
      return <NoData />;
    }
  }
};
