import { useEffect, useState } from "react";

export const PreviewDetailsPage = () => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let dateParams = params.get("date");
    if (dateParams) {
      setDate(dateParams);
    }
  }, []);

  return <>{date}</>;
};
