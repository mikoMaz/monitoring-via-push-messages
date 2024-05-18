import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { IUIProps } from "../../app-main/app-main";

export const ViewTypeSelectionTabs = ({ ...ui }: IUIProps) => {
  const TabButton = ({ text }: { text: string }) => {
    return (
      <Tab
        marginRight="10px"
        _selected={{ bg: ui.colors.primary, color: ui.colors.white }}
      >
        {text}
      </Tab>
    );
  };
  return (
    <Tabs variant="soft-rounded" size="md">
      <TabList>
        <TabButton text="All Devices" />
        <TabButton text="Bridges" />
        <TabButton text="Gateways" />
        <TabButton text="Sensors" />
      </TabList>
    </Tabs>
  );
};
