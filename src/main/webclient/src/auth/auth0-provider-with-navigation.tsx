import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import config from "../config/config.json";
import { isLocalHost } from "../client/isLocalhost";

const Auth0ProviderWithNavigation = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(
      {
        pathname: "/application/monitoring",
        search: new URLSearchParams({ view: "allDevices" }).toString(),
      },
      { replace: false }
    );
  };

  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientID}
      authorizationParams={{
        redirect_uri: isLocalHost() ? `${config.appVersions.LOCAL.APP_URL}` : `${config.appVersions.REMOTE.APP_URL}`,
        audience: `${config.auth0.audience}`,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigation;
