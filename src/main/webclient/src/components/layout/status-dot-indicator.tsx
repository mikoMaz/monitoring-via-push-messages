import { deviceStatus } from "../../types/deviceModel";
import { Icon, IconProps } from "@chakra-ui/react";

interface IStatusIndicator {
  status: deviceStatus;
}

export const StatusDotIndicator = ({ status }: IStatusIndicator) => {
  const CircleIcon = (props: IconProps) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  const drawStatusIndicator = () => {
    switch (status) {
      case deviceStatus.active:
        return <CircleIcon color="green" />;
      case deviceStatus.disabled:
        return <CircleIcon color="red" />;
    }
  };
  return drawStatusIndicator();
};
