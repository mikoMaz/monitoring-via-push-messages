import saveAs from "file-saver";
import { ChartTemplate, chartType, IChartTemplate } from './chartTemplate';
import { IDeviceModel } from "./deviceModel";

export interface chartTemplateJsonObject {
  model: IDeviceModel;
  templates: IChartTemplate[];
}

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

  public static parsePresetsToJson(
    chartTemplates: ChartTemplate[],
    deviceModel: IDeviceModel
  ): chartTemplateJsonObject {
	const object: chartTemplateJsonObject =  {
		model: deviceModel,
		templates: chartTemplates.map((temp) => {
			const jsonTemplate: IChartTemplate = {
				id: temp.id,
				name: temp.name,
				type: typeof temp.type === "string" ? chartType[temp.type] : temp.type,

			}
			return jsonTemplate;
		})
	}
	return object;
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

  public static savePresetsToLocalStorage(
    key: localStorageKey,
    presets: ChartTemplate[]
  ) {
    localStorage.setItem(key, JSON.stringify(presets.map((p) => p.toJSON())));
  }

  public static clearLocalStorageEntry(key: localStorageKey) {
    localStorage.removeItem(key);
  }
}
