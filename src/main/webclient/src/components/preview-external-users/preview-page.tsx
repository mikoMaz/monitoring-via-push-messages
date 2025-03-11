import { UIProps } from "../../config/config";
import { useEffect, useState } from "react";
import { ValidateSecret } from "./components/validate-secret";
import { PreviewChartsContainer } from "./components/preview-charts-container";
import { Center } from "@chakra-ui/react";
import { useApiClient } from "../../api/useAPIClient";

export const PreviewPage = () => {
  document.body.style.backgroundColor = UIProps.colors.background;

  const apiClient = useApiClient();

  const [compamyContext, setCompanyContext] = useState<string>("");

  const [secret, setSecret] = useState<string>("");

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let context = params.get("context");
    setCompanyContext(context ?? "");
  }, []);

  useEffect(() => {
    //update state
  }, [compamyContext, secret]);

  if (!compamyContext) {
    return <Center>Provide company name in the url params</Center>;
  } else if (!secret) {
    return (
      <ValidateSecret
        apiClient={apiClient}
        context={compamyContext}
        setSecret={setSecret}
      />
    );
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
