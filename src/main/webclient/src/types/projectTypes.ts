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

export const getMailNickname = (mail: string): string => {
  try {
    return mail.split("@")[0];
  } catch (error: any) {
    console.error(
      "Email splitting error. Email: " + mail + "Error: " + error.message
    );
    return mail;
  }
};
