import "./App.css";
import { UIProps } from "./config/config";
import Auth0ProviderWithNavigation from "./auth/auth0-provider-with-navigation";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { NotFoundPage } from "./components/not-found-page/not-found-page";
import { PreviewPage } from "./components/preview-external-users/preview-page";
import { useEffect } from "react";
import { AppVersionSelection } from "./components/app-body/appVersionSelection";

export default function App() {
  document.body.style.backgroundColor = UIProps.colors.background;

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if(location.pathname === "/") {
      navigate("/application");
    }
  }, [location.pathname, navigate])

  return (
    <Routes>
      <Route path="/preview" key="preview" element={<PreviewPage />} />
      <Route
        path="/application/*"
        key="application"
        element={
          <Auth0ProviderWithNavigation>
            <AppVersionSelection />
          </Auth0ProviderWithNavigation>
        }
      />
      <Route path="*" key="root-not-found" element={<NotFoundPage />} />
    </Routes>
  );
}
