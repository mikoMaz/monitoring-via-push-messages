export interface IHistoryChartData {
  active: number;
  inactive: number;
  disabled: number;
  timestamp: string;
  allDevices: number;
  activePercent: number;
  inactivePercent: number;
  disabledPercent: number;
}

export interface IHistoryChartDataRaw {
  timestamp: number;
  active: number;
  inactive: number;
  disabled: number;
}

export const formatRawIHistoryChartData = (
  data: IHistoryChartDataRaw[],
  dateFrom: string,
  dateTo: string
): IHistoryChartData[] => {
  const parseDate = (dateString: string): Date => {
    return new Date(dateString);
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const getPercentValueOfAllDevices = (allDevices: number, devices: number) => {
    return +(devices / allDevices * 100).toFixed(2);
  };

  const startDate = parseDate(dateFrom);
  const endDate = parseDate(dateTo);

  return data
    .map((entry) => {
      const entryDate = addDays(startDate, entry.timestamp);
      const allDevices = entry.active + entry.inactive + entry.disabled;
      // console.log(formatDate(entryDate));
      return {
        active: entry.active,
        inactive: entry.inactive,
        disabled: entry.disabled,
        timestamp: formatDate(entryDate),
        allDevices: allDevices,
        activePercent: getPercentValueOfAllDevices(allDevices, entry.active),
        inactivePercent: getPercentValueOfAllDevices(
          allDevices,
          entry.inactive
        ),
        disabledPercent: getPercentValueOfAllDevices(
          allDevices,
          entry.disabled
        ),
      };
    })
    .filter((entry) => {
      const entryDate = parseDate(entry.timestamp);
      return entryDate >= startDate && entryDate <= endDate;
    });
};

export const emptyHistoryChartData: IHistoryChartData = {
  active: 0,
  inactive: 0,
  disabled: 0,
  timestamp: "",
  allDevices: 0,
  activePercent: 0,
  disabledPercent: 0,
  inactivePercent: 0,
};
