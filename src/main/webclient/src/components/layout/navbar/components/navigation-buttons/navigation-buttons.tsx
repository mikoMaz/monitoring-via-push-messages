import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IUIProps } from "../../../../../types/projectTypes";
import { UIProps } from "../../../../../config/config";

export const NavigationButtons = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const urlPatterns = [/(monitoring.*)/, /(dashboard.*)/, /(about.*)/];

  const matchingUrlIndex = (path: string): number | undefined => {
    for (let i = 0; i < 3; i++) {
      if (urlPatterns[i].test(path)) {
        return i;
      }
    }
    return undefined;
  };

  const updateSelectedTab = () => {
    const urlIndex = matchingUrlIndex(location.pathname);
    if (urlIndex) {
      handleTabsChange(urlIndex);
    }
  };

  useEffect(() => {
    updateSelectedTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Tabs
      colorScheme={UIProps.colors.secondary}
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList>
        <Tab
          onClick={() => {
            navigate("/application/monitoring");
          }}
        >
          Monitoring
        </Tab>
        <Tab
          onClick={() => {
            navigate("/application/dashboard");
          }}
        >
          Dashboard
        </Tab>
        <Tab
          onClick={() => {
            navigate("/application/about");
          }}
        >
          About
        </Tab>
      </TabList>
    </Tabs>
  );
};
