import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink} from "@chakra-ui/react";
import { deviceType } from "../../../../../types/deviceModel";

interface IDeviceDetailsLink {
  type: deviceType.bridge | deviceType.gateway;
  id: string;
}

export const DeviceDetailsLink = ({ type, id }: IDeviceDetailsLink) => {
  switch (type) {
    case deviceType.bridge:
      return (
        <ChakraLink as={ReactRouterLink} to={`/monitoring/bridge?id=${id}`}>
          Bridge {id}
        </ChakraLink>
      );
    case deviceType.gateway:
      return (
        <ChakraLink as={ReactRouterLink} to={`/monitoring/gateway?id=${id}`}>
          Gateway {id}
        </ChakraLink>
      );
  }
};
