import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { AllDevicesView } from "../layout/monitoring-tables/all-devices-view/all-devices-view";
import { useEffect, useState } from "react";
import { FilteringHeigth } from "../../types/projectTypes";
import { FilterSectionContainer } from "./components/filter-section-container";
import { ViewTypeSelectionTabs } from "./components/view-type-selection-tabs";
import { FilterSectionButtons } from "./components/filter-section-buttons";
import { SingleDeviceView } from "../layout/monitoring-tables/single-device-view/single-device-view";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UIProps } from "../../config/config";

enum viewOption {
  allDevices,
  bridges,
  gateways,
  sensors,
}

interface IMonitoringPage {
  model: DeviceModel;
  setInactiveSwitchEnabled: (value: boolean) => void;
  inactiveSwitchEnabled: boolean;
}

export const MonitoringPage = ({
  model,
  setInactiveSwitchEnabled,
  inactiveSwitchEnabled,
}: IMonitoringPage) => {
  const ui = UIProps;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

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
    navigate({ pathname: "", search: searchParams.toString() });
  };

  const renderSelectedView = () => {
    switch (selectedViewOption) {
      case viewOption.allDevices:
        return (
          <AllDevicesView model={model} inactiveOnly={inactiveSwitchEnabled} />
        );
      case viewOption.sensors:
        return (
          <SingleDeviceView
            model={model.getSensorsArray()}
            inactiveOnly={inactiveSwitchEnabled}
          />
        );
      case viewOption.gateways:
        return (
          <SingleDeviceView
            model={model.getGatewaysArray()}
            inactiveOnly={inactiveSwitchEnabled}
          />
        );
      case viewOption.bridges:
        return (
          <SingleDeviceView
            model={model.getBridgesArray()}
            inactiveOnly={inactiveSwitchEnabled}
          />
        );
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
          <Grid templateColumns="auto 1fr auto" gap={2}>
            <GridItem width="auto">
              <ViewTypeSelectionTabs
                index={selectedViewOption}
                onSelectionChanged={onSelectedViewChanged}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <div className="empty-space" />
            </GridItem>
            <GridItem width="auto">
              <FilterSectionButtons
                setFilterEnabled={setFilteringSectionEnabled}
                inactiveSwitchEnabled={inactiveSwitchEnabled}
                inactiveDevicesSwitched={() => {
                  setInactiveSwitchEnabled(!inactiveSwitchEnabled);
                }}
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
