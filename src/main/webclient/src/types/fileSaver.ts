import saveAs from "file-saver";
import { ChartTemplate } from "./chartTemplate";

export class FileSaver {
  public static saveChartPresetsToJson(templates: ChartTemplate[]) {
    const presetsJSON = JSON.stringify(
      templates.map((preset) => preset.toJSON()),
      null,
      2
    );
    const blob = new Blob([presetsJSON], { type: "application/json" });
    saveAs(blob, "chartPresets.json");
  }
}

export type localStorageKey = "chartPresets";

export class LocalStorageManager {
  public static loadPresetsFromLocalStorage(
    key: localStorageKey
  ): ChartTemplate[] {
    const savedPresets = localStorage.getItem(key);
    if (savedPresets) {
      return JSON.parse(savedPresets).map((presetData: any) =>
        ChartTemplate.fromJSON(presetData)
      );
    }
    return [];
  }

  public static savePresetsToLocalStorage(key: localStorageKey, presets: ChartTemplate[]) {
    localStorage.setItem(
      key,
      JSON.stringify(presets.map((p) => p.toJSON()))
    );
  }

  public static clearLocalStorageEntry(key: localStorageKey) {
    localStorage.removeItem(key);
  }
}
