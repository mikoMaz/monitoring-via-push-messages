export interface IHistoryValue {
  disabled: number;
  timestamp: string;
  active: number;
  incidents: IDeviceIncident[];
}

export interface IHistoryValueResponse {
  timestamp: number;
  active: number;
  incidents: IDeviceIncident[];
}

export interface IDeviceIncident {
  Id: string;
  incidents: IDateRangeIncident[];
}

export interface IDateRangeIncident {
  Start: number;
  End: number;
}

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatIHistoryValuesResponse = (
  data: IHistoryValueResponse[],
  dateFrom: string,
  dateTo: string
): IHistoryValue[] => {
  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const getPercentValueOfAllDevices = (allDevices: number, devices: number) => {
    return +((devices / allDevices) * 100).toFixed(2);
  };

  const startDate = parseDate(dateFrom);
  const endDate = parseDate(dateTo);

  return data
    .map((entry) => {
      let active = entry.active < 0 ? 0 : entry.active;
      active = active > 1 ? active : active * 100;
      const disabled = 100 - active;
      const entryDate = addDays(startDate, entry.timestamp);
      return {
        active: entry.active,
        disabled: disabled,
        timestamp: formatDate(entryDate),
        incidents: entry.incidents,
      };
    })
    .filter((entry) => {
      const entryDate = parseDate(entry.timestamp);
      return entryDate >= startDate && entryDate <= endDate;
    });
};

export const emptyHistoryValue: IHistoryValue = {
  active: 0,
  disabled: 100,
  incidents: [],
  timestamp: "2025-01-01",
};
