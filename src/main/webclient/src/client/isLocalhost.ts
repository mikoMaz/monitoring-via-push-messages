import config from "../config/config.json";

export const isLocalHost = (): boolean => {
	const host = window.location.hostname;
	if (host === config.appVersions.LOCAL.HOST) {
		return true
	  }
	  else {
		return false;
	  }
}
