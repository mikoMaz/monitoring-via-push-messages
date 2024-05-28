import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { IUIProps } from "../../../../app-main/app-main";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const NavigationButtons = ({ ...ui }: IUIProps) => {
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
      colorScheme={ui.colors.secondary}
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList>
        <Tab
          onClick={() => {
            navigate("/monitoring");
          }}
        >
          Monitoring
        </Tab>
        <Tab
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </Tab>
        <Tab
          onClick={() => {
            navigate("/about");
          }}
        >
          About
        </Tab>
      </TabList>
    </Tabs>
  );
};
