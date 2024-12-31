import { UIProps } from "../../config/config";
import { useEffect, useState } from "react";
import { ValidateSecret } from "./components/validate-secret";
import { APIClient } from "../../api/api-client";
import {
  PreviewChartsContainer,
} from "./components/preview-charts-container";

export const PreviewPage = () => {
  document.body.style.backgroundColor = UIProps.colors.background;

  const apiClient = new APIClient();

  const [compamyContext, setCompanyContext] = useState<string>("");

  const [secret, setSecret] = useState<string>("");

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let context = params.get("context");
    if (context) {
      setCompanyContext(context);
    }
  }, []);

  useEffect(() => {
    //update state
  }, [compamyContext, secret]);

  if (!secret) {
    return <ValidateSecret context={compamyContext} setSecret={setSecret} />;
  } else {
    return (
      <PreviewChartsContainer
        apiClient={apiClient}
        context={compamyContext}
        secret={secret}
      />
    );
  }
};
