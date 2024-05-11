import { Avatar, IconButton } from "@chakra-ui/react";
import { IUIProps } from "../../../../app-main/app-main";

export const UserDropdown = ({...ui}: IUIProps) => {
  return (<IconButton icon={<Avatar size="sm"/>} aria-label={"Profile"} colorScheme={ui.colors.accent}/>);
};
