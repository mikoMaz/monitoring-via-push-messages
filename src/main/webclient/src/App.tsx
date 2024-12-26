import "./App.css";
import "@mantine/core/styles.css";
import { AppBody } from "./components/app-body/app-body";
import { UIProps } from "./config/config";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginPage } from "./components/login-page/login-page";

export default function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();
  document.body.style.backgroundColor = UIProps.colors.background;

  if (error) {
    return <div>Athentication error occured: {error.message}</div>;
  } else if (isLoading) {
    return <div>Loading ...</div>;
  } else if (!isAuthenticated) {
    return <LoginPage />;
  } else if (isAuthenticated) {
    return <AppBody />;
  } else {
    return <></>;
  }
}
