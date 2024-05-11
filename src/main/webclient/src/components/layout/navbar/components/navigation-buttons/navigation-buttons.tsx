import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { IUIProps } from "../../../../app-main/app-main";

export const NavigationButtons = ({ ...ui }: IUIProps) => {
  return (
    <Tabs colorScheme={ui.colors.secondary}>
      <TabList>
        <Tab>Monitoring</Tab>
        <Tab>Dashboard</Tab>
        <Tab>About</Tab>
      </TabList>
    </Tabs>
  );
};
