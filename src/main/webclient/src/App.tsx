import "./App.css";
import { UIProps } from "./config/config";
import { Auth0Application } from "./components/app-body/auth0-application";
import Auth0ProviderWithNavigation from "./auth/auth0-provider-with-navigation";
import { Route, Routes } from "react-router-dom";
import { NotFoundPage } from "./components/not-found-page/not-found-page";

export default function App() {
  document.body.style.backgroundColor = UIProps.colors.background;

  return (
    <Routes>
      <Route path="/preview" key="preview" element={<>Preview</>} />
      <Route
        path="/application/*"
        key="application"
        element={
          <Auth0ProviderWithNavigation>
            <Auth0Application />
          </Auth0ProviderWithNavigation>
        }
      />
      <Route path="/" key="root-landing-page" element={<>Root landing page</>} />
      <Route path="*" key="root-not-found" element={<NotFoundPage />} />
    </Routes>
  );
}
