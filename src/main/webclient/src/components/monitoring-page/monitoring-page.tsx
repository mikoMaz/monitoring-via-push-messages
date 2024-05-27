import { Box, Grid, GridItem } from "@chakra-ui/react";
import {
  Bridge,
  DeviceModel,
  Gateway,
  Sensor,
  deviceStatus,
} from "../../types/deviceModel";
import { AllDevicesView } from "../layout/monitoring-tables/all-devices-view/all-devices-view";
import { useState } from "react";
import { FilteringHeigth } from "../../types/projectTypes";
import { FilterSectionContainer } from "./components/filter-section-container";
import { ViewTypeSelectionTabs } from "./components/view-type-selection-tabs";
import { IUIProps } from "../app-main/app-main";
import { FilterSectionButtons } from "./components/filter-section-buttons";
import { SingleDeviceView } from "../layout/monitoring-tables/single-device-view/single-device-view";
import { APIClient } from "../../api/api-client";

enum viewOption {
  allDevices,
  sensors,
  gateways,
  bridges,
}

export const MonitoringPage = ({ ...ui }: IUIProps) => {
  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    APIClient.getRecentUpdates()
  );

  const [filteringHeigth, setFilteringHeigth] =
    useState<FilteringHeigth>("0px");

  const [selectedViewOption, setSelectedViewOption] = useState<viewOption>(
    viewOption.allDevices
  );

  const setFilteringSectionEnabled = () => {
    switch (filteringHeigth) {
      case "0px":
        setFilteringHeigth("200px");
        break;
      case "200px":
        setFilteringHeigth("0px");
        break;
    }
  };

  const onSelectedViewChanged = (index: number) => {
    switch (index) {
      case 0:
        setSelectedViewOption(viewOption.allDevices);
        break;
      case 1:
        setSelectedViewOption(viewOption.bridges);
        break;
      case 2:
        setSelectedViewOption(viewOption.gateways);
        break;
      case 3:
        setSelectedViewOption(viewOption.sensors);
        break;
      default:
        console.error("Out of memory index");
    }
  };

  const renderSelectedView = () => {
    switch (selectedViewOption) {
      case viewOption.allDevices:
        return <AllDevicesView model={deviceModel} />;
      case viewOption.sensors:
        return <SingleDeviceView model={deviceModel.getSensorsArray()} />;
      case viewOption.gateways:
        return <SingleDeviceView model={deviceModel.getGatewaysArray()} />;
      case viewOption.bridges:
        return <SingleDeviceView model={deviceModel.getBridgesArray()} />;
    }
  };

  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={ui.colors.background}
      boxShadow="inner"
    >
      <Grid templateRows={`90px ${filteringHeigth} 1fr`}>
        <GridItem
          className="control-panel-buttons"
          marginTop="28px"
          marginBottom="28px"
        >
          <Grid templateColumns="3fr 4fr 3fr">
            <GridItem>
              <ViewTypeSelectionTabs
                ui={ui}
                onSelectionChanged={onSelectedViewChanged}
              />
            </GridItem>
            <Grid>
              <div className="empty-space" />
            </Grid>
            <GridItem>
              <FilterSectionButtons
                ui={ui}
                setFilterEnabled={setFilteringSectionEnabled}
              />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem className="filter-section">
          <FilterSectionContainer heigth={filteringHeigth} />
        </GridItem>
        <GridItem className="monitoring-content-view">
          {renderSelectedView()}
        </GridItem>
      </Grid>
    </Box>
  );
};
