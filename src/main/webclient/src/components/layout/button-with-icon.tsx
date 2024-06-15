import { Button, ButtonProps } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

interface IButtonWithIconProps {
  icon: React.ReactElement;
  text: string;
  onClick: () => void
  props?: ButtonProps;
}

export const ButtonWithIcon = ({ text, icon, onClick, props }: IButtonWithIconProps) => {
  return (
    <Button
      leftIcon={icon}
      {...props}
      colorScheme="secondary"
      color={UIProps.colors.black}
      variant="solid"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
