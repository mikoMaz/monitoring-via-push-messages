import { useRef } from "react";
import { APIClient } from "./api-client";

export function useApiClient() {
  const apiClientRef = useRef<APIClient>(new APIClient());

  return apiClientRef.current;
}
