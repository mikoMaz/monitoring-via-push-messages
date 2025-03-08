export interface IHistoryValues extends IHistoryValuesResponse {
  disabled: number;
}

export interface IHistoryValuesResponse {
  timestamp: number;
  active: number;
  incidents: number;
}

export const formatIHistoryValuesResponse = (
  data: IHistoryValuesResponse
): IHistoryValues => {
  return {
    active: data.active,
    disabled: 100 - data.active,
    incidents: data.incidents,
    timestamp: data.timestamp,
  };
};
