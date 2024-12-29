import { UIProps } from "../../config/config";
import { useEffect, useState } from "react";
import { ValidateSecret } from "./components/validate-secret";

export const PreviewPage = () => {
  document.body.style.backgroundColor = UIProps.colors.background;

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
  }
  else {
	return <>{secret}</>
  }
};
