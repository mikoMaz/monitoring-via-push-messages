import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { IUIProps } from "../../app-main/app-main";

interface IViewTypeSelectionTabs {
  ui: IUIProps;
  onSelectionChanged: (id:number) => void;
}

export const ViewTypeSelectionTabs = ({
  ui,
  onSelectionChanged,
}: IViewTypeSelectionTabs) => {
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
    <Tabs
      variant="soft-rounded"
      size="md"
      colorScheme="green"
      onChange={(index) => {
        onSelectionChanged(index);
      }}
    >
      <TabList>
        <TabButton text="All Devices" />
        <TabButton text="Bridges" />
        <TabButton text="Gateways" />
        <TabButton text="Sensors" />
      </TabList>
    </Tabs>
  );
};
