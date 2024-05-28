import { Button, ButtonProps } from "@chakra-ui/react";
import { appProps } from "../../config/config";

interface IButtonWithIconProps {
  icon: React.ReactElement;
  text: string;
  onClick: () => void
  props?: ButtonProps;
}

export const ButtonWithIcon = ({ text, icon, onClick, props }: IButtonWithIconProps) => {
  const ui = appProps.appMainProps.ui;
  return (
    <Button
      leftIcon={icon}
      {...props}
      colorScheme="secondary"
      color={ui.colors.black}
      variant="solid"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
