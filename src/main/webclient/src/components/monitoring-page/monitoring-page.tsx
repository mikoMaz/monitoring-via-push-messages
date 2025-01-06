import { Box, Grid, GridItem } from "@chakra-ui/react";
import { DeviceModel } from "../../types/deviceModel";
import { AllDevicesView } from "../layout/monitoring-tables/all-devices-view/all-devices-view";
import { useEffect, useState } from "react";
import { FilteringHeight } from "../../types/projectTypes";
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

  const [filteringHeight, setFilteringHeigth] =
    useState<FilteringHeight>("0px");

  const [selectedViewOption, setSelectedViewOption] = useState<viewOption>(
    viewOption.allDevices
  );

  const [deviceIdFilter, setDeviceIdFilter] = useState<string>("");

  const setFilteringSectionEnabled = () => {
    switch (filteringHeight) {
      case "0px":
        setFilteringHeigth("100px");
        break;
      case "100px":
        setFilteringHeigth("0px");
        break;
    }
  };

  const onSelectedViewChanged = (index: number) => {
    switch (index) {
      case 0:
        setDeviceIdFilter("");
        changeSelectedViewOption(viewOption.allDevices);
        break;
      case 1:
        setDeviceIdFilter("");
        changeSelectedViewOption(viewOption.bridges);
        break;
      case 2:
        setDeviceIdFilter("");
        changeSelectedViewOption(viewOption.gateways);
        break;
      case 3:
        setDeviceIdFilter("");
        changeSelectedViewOption(viewOption.sensors);
        break;
      default:
        setDeviceIdFilter("");
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
          <AllDevicesView
            model={model}
            inactiveOnly={inactiveSwitchEnabled}
            deviceIdFilter={deviceIdFilter}
          />
        );
      case viewOption.sensors:
        return (
          <SingleDeviceView
            model={model.getSensorsArray()}
            inactiveOnly={inactiveSwitchEnabled}
            deviceIdFilter={deviceIdFilter}
          />
        );
      case viewOption.gateways:
        return (
          <SingleDeviceView
            model={model.getGatewaysArray()}
            inactiveOnly={inactiveSwitchEnabled}
            deviceIdFilter={deviceIdFilter}
          />
        );
      case viewOption.bridges:
        return (
          <SingleDeviceView
            model={model.getBridgesArray()}
            inactiveOnly={inactiveSwitchEnabled}
            deviceIdFilter={deviceIdFilter}
          />
        );
    }
  };

  //TODO czy wciąż kontekst linku działa po zalogowaniu auth0
  //np monitoring?view=sensors czy wciąż przeniesie do sensors po zalogowaniu czy domyślna wartość
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
      <Grid templateRows={`90px ${filteringHeight} 1fr`}>
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
                deviceIdFilter={deviceIdFilter}
                setDeviceIdFilter={setDeviceIdFilter}
              />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem className="filter-section">
          <FilterSectionContainer
            height={filteringHeight}
            inactiveSwitchEnabled={inactiveSwitchEnabled}
            inactiveDevicesSwitched={() => {
              setInactiveSwitchEnabled(!inactiveSwitchEnabled);
            }}
          />
        </GridItem>
        <GridItem className="monitoring-content-view">
          {renderSelectedView()}
        </GridItem>
      </Grid>
    </Box>
  );
};
