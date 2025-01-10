import { usingTestData } from "../../util/useTestData";
import { AppBody } from "./app-body";
import { Auth0Application } from "./auth0-application";

export const AppVersionSelection = () => {
  if (usingTestData()) {
    return <AppBody />;
  } else {
    return <Auth0Application />;
  }
};
