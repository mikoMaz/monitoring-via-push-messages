import { jwtDecode } from "jwt-decode";
import { isLocalHost } from "../client/isLocalhost";
import config from "../config/config.json";

export const diplayAccessToken = (token: string): void => {
  if (isLocalHost() && config.appVersions.LOCAL.EXPOSE_ACCESS_TOKEN) {
    console.log("token " + token);
	console.log(jwtDecode(token));
  } else if (config.appVersions.LOCAL.EXPOSE_ACCESS_TOKEN) {
    console.log("token " + token);
	console.log(jwtDecode(token));
  }
};
