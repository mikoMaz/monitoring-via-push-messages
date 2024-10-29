import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import config from "../config/config.json";

const Auth0ProviderWithNavigation = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate(
      {
        pathname: "/monitoring",
        search: new URLSearchParams({ view: "allDevices" }).toString(),
      },
      { replace: true }
    );
  };

  return (
    <Auth0Provider
      domain={config.auth0.domain}
      clientId={config.auth0.clientID}
      authorizationParams={{
        redirect_uri: `${config.appVersions.LOCAL.APP_URL}`,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigation;
