import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";

interface IViewTypeSelectionTabs {
  index: number;
  onSelectionChanged: (id: number) => void;
}

export const ViewTypeSelectionTabs = ({
  index,
  onSelectionChanged,
}: IViewTypeSelectionTabs) => {
  const TabButton = ({ text }: { text: string }) => {
    const ui = UIProps;
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
      index={index}
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
