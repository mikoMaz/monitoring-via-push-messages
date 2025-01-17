import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "../login-page/login-page";
import { AppBody } from "./app-body";
import { LoadingPage } from "../loading-page/loading-page";

export const Auth0Application = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (error) {
    return <div>Athentication error occured: {error.message}</div>;
  } else if (isLoading) {
    return <LoadingPage />;
  } else if (!isAuthenticated) {
    return <LoginPage />;
  } else if (isAuthenticated) {
    return <AppBody />;
  } else {
    return <>Auth0 routing error</>;
  }
};
