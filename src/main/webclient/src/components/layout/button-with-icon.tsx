import { Button, ButtonProps } from "@chakra-ui/react";
import { appProps } from "../../config/config";

interface IButtonWithIconProps {
  icon: React.ReactElement;
  text: string;
  props?: ButtonProps;
}

export const ButtonWithIcon = ({ text, icon, props }: IButtonWithIconProps) => {
  const ui = appProps.appMainProps.ui;
  return (
    //ustawic theme
    <Button
      leftIcon={icon}
      {...props}
      colorScheme="secondary"
      color={ui.colors.black}
      variant="solid"
    >
      {text}
    </Button>
  );
};
