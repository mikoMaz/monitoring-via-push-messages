import { IEnvConfig } from "../types/IEnvConfig";

export const isLocalHost = () => {
  return getEnvConfig().envName === "localhost";
};

export const getEnvConfig = (): IEnvConfig => {
  const envName = window.location.hostname;

  return {
    envName: envName,
  };
};
