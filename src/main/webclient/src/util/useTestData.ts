import { isLocalHost } from "../client/isLocalhost";
import config from "../config/config.json";

export const usingTestData = (): boolean => {
  if (isLocalHost()) {
    return config.appVersions.LOCAL.USE_TEST_DATA;
  } else {
    return config.appVersions.REMOTE.USE_TEST_DATA;
  }
};
