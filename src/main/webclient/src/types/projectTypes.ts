import { DeviceModel } from "./deviceModel";

export type ProjectColorsDictionary = {
  white: string;
  black: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  table: { active: string; disabled: string };
  charts: { active: string; disabled: string; background: string };
};

export interface IUIProps {
  colors: ProjectColorsDictionary;
  height: {
    navbar: string;
    footer: string;
  };
}

export interface IAppProps {
  routes: JSX.Element[];
  model: DeviceModel;
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
}

export type FilteringHeight = "0px" | "100px";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
