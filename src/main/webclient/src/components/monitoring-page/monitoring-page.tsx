import { Grid, GridItem } from "@chakra-ui/react";
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

export const MonitoringPage = ({ ...ui }: IUIProps) => {
  const [filteringHeigth, setFilteringHeigth] =
    useState<FilteringHeigth>("0px");

  const deviceModel = new DeviceModel([
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
  ]);
  return (
    <Grid templateRows={`100px ${filteringHeigth} 1fr`}>
      <GridItem className="control-panel-buttons">
        <Grid templateColumns="3fr 3fr 4fr">
          <GridItem>
            <ViewTypeSelectionTabs {...ui} />
          </GridItem>
          <Grid>
            <div className="empty-space" />
          </Grid>
          <GridItem></GridItem>
        </Grid>
      </GridItem>
      <GridItem className="filter-section">
        <FilterSectionContainer heigth={filteringHeigth} />
      </GridItem>
      <GridItem className="monitoring-content-view">
        <AllDevicesView {...deviceModel} />
      </GridItem>
    </Grid>
  );
};
