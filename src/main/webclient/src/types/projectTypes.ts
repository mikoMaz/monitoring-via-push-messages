import { DeviceModel } from "./deviceModel";

export type ProjectColorsDictionary = {
  white: string;
  black: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  table: { active: string; disabled: string };
  charts: { active: string; disabled: string, background: string };
};

export interface IUIProps {
  colors: ProjectColorsDictionary;
  heigth: {
    navbar: string;
    footer: string;
  };
}

export interface IAppProps {
  routes: JSX.Element[];
  model: DeviceModel;
}

export type FilteringHeigth = "0px" | "200px";

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
