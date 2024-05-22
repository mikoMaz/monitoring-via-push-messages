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

enum viewOption {
  allDevices,
  sensors,
  gateways,
  bridges,
}

export const MonitoringPage = ({ ...ui }: IUIProps) => {
  const [deviceModel, setDeviceModel] = useState<DeviceModel>(
    new DeviceModel([
      new Bridge("bridge1", deviceStatus.active, new Date(), [
        new Gateway("gateway1", deviceStatus.active, new Date(), [
          new Sensor("sensor1", deviceStatus.active, new Date()),
          new Sensor("sensor2", deviceStatus.active, new Date()),
        ]),
        new Gateway("gateway2", deviceStatus.active, new Date(), []),
      ]),
      new Bridge("bridge2", deviceStatus.active, new Date(), [
        new Gateway("gateway3", deviceStatus.active, new Date(), [
          new Sensor("sensor3", deviceStatus.active, new Date()),
        ]),
      ]),
    ])
  );

  const [filteringHeigth, setFilteringHeigth] =
    useState<FilteringHeigth>("0px");

  const [selectedViewOption, setSelectedViewOption] = useState<viewOption>(
    viewOption.allDevices
  );

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
    }
  };

  const renderSelectedView = () => {
    switch (selectedViewOption) {
      case viewOption.allDevices:
        return <AllDevicesView model={deviceModel} />;
      case viewOption.sensors:
        return <SingleDeviceView model={deviceModel.sensors} />;
      case viewOption.bridges:
        return <SingleDeviceView model={deviceModel.bridges} />;
      case viewOption.gateways:
        return <SingleDeviceView model={deviceModel.gateways} />;
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
              <FilterSectionButtons ui={ui} />
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
