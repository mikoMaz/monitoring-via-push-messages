import { Button, ButtonProps, theme } from "@chakra-ui/react";
import { IUIProps } from "../app-main/app-main";

interface IButtonWithIconProps {
  icon: React.ReactElement;
  text: string;
  ui: IUIProps;
  props?: ButtonProps;
}

export const ButtonWithIcon = ({
  text,
  icon,
  ui,
  props,
}: IButtonWithIconProps) => {
  return (
    //ustawic theme
    <Button leftIcon={icon} {...props} colorScheme={theme.colors.green} color={ui.colors.black} variant="solid">
      {text}
    </Button>
  );
};
