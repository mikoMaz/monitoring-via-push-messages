import {
  CurrentChart,
  ICurrentChart,
} from "../components/dashboard-page/components/current-chart";
import {
  IRecentChart,
  RecentChart,
} from "../components/dashboard-page/components/recent-chart";

export enum chartType {
  Current,
  Recent,
}

export class ChartTemplate {
  public type: chartType;
  recentChartModel?: IRecentChart;
  currentChartModel?: ICurrentChart;

  constructor(type: chartType) {
    this.type = type;
  }

  private invalidChart() {
    return <>Data model is not present</>;
  }

  public drawChart() {
    switch (this.type) {
      case chartType.Current:
        if (this.currentChartModel) {
          return <CurrentChart {...this.currentChartModel} />;
        } else {
          return this.invalidChart();
        }
      case chartType.Recent:
        if (this.recentChartModel) {
          return <RecentChart {...this.recentChartModel} />;
        } else {
          return this.invalidChart();
        }
      default:
        return this.invalidChart();
    }
  }
}
