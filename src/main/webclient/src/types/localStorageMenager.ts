import { ChartTemplate } from "./chartTemplate";
import { chartTemplateJsonObject, FileSaver } from "./fileSaver";

const storageKeysArray = ["alertsEnabled", "chartPresets"] as const;
type storageKeys = (typeof storageKeysArray)[number];

export class LocalStorageManager {
  public static saveDeviceAlertsEnabled(value: boolean) {
    localStorage.setItem("alertsEnabled", value.toString());
  };

  public static getDeviceAlertsEnabledValue(): boolean {
    const enabled = localStorage.getItem("alertsEnabled");
    if (enabled && enabled === "true") {
      return true;
    }
    return false;
  };

  public static loadPresetsFromLocalStorage(): ChartTemplate[] {
    const savedPresetsItem = localStorage.getItem("chartPresets");
    if (savedPresetsItem) {
      const presets: chartTemplateJsonObject = JSON.parse(savedPresetsItem);
      return FileSaver.parseJsonToChartTemplates(presets);
    }
    return [];
  }

  public static savePresetsToLocalStorage(
    presets: ChartTemplate[]
  ) {
    localStorage.setItem(
      "chartPresets",
      JSON.stringify(FileSaver.parsePresetsToJson(presets))
    );
  }

  public static saveJsonToLocalStorage(
    json: chartTemplateJsonObject
  ) {
    localStorage.setItem("chartPresets", JSON.stringify(json));
  }

  public static clearLocalStorageEntry(key: storageKeys) {
    localStorage.removeItem(key);
  }

  public static clearLocalStorage() {
    storageKeysArray.forEach((key) => {
      LocalStorageManager.clearLocalStorageEntry(key);
    });
  }
}
