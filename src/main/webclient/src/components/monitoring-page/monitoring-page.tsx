import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { AllDevicesView } from "../layout/monitoring-tables/all-devices-view/all-devices-view";
import { useEffect, useState } from "react";
import { FilteringHeigth } from "../../types/projectTypes";
import { FilterSectionContainer } from "./components/filter-section-container";
import { ViewTypeSelectionTabs } from "./components/view-type-selection-tabs";
import { IUIProps } from "../app-main/app-main";
import { FilterSectionButtons } from "./components/filter-section-buttons";
import { SingleDeviceView } from "../layout/monitoring-tables/single-device-view/single-device-view";
import { APIClient } from "../../api/api-client";
import { useSearchParams } from "react-router-dom";

enum viewOption {
  allDevices,
  bridges,
  gateways,
  sensors,
}

export const MonitoringPage = ({ ...ui }: IUIProps) => {
  const [searchParams] = useSearchParams();

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
        changeSelectedViewOption(viewOption.allDevices);
        break;
      case 1:
        changeSelectedViewOption(viewOption.bridges);
        break;
      case 2:
        changeSelectedViewOption(viewOption.gateways);
        break;
      case 3:
        changeSelectedViewOption(viewOption.sensors);
        break;
      default:
        console.error("Out of memory index");
    }
  };

  const changeSelectedViewOption = (option: viewOption) => {
    setSelectedViewOption(option);
    searchParams.set("view", viewOption[option]);
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

  //onload function
  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let viewType = params.get("view");
    if (viewType) {
      switch (true) {
        case viewType === viewOption[viewOption.allDevices]:
          setSelectedViewOption(viewOption.allDevices);
          break;
        case viewType === viewOption[viewOption.sensors]:
          setSelectedViewOption(viewOption.sensors);
          break;
        case viewType === viewOption[viewOption.gateways]:
          setSelectedViewOption(viewOption.gateways);
          break;
        case viewType === viewOption[viewOption.bridges]:
          setSelectedViewOption(viewOption.bridges);
          break;
        default:
          setSelectedViewOption(viewOption.allDevices);
          break;
      }
    }
  }, []);

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
                index={selectedViewOption}
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
