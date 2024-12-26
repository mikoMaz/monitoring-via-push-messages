import saveAs from "file-saver";
import {
  ChartTemplate,
  chartTypeFromString,
  IChartTemplate,
} from "./chartTemplate";
import { IDeviceModel } from "./deviceModel";

export interface chartTemplateJsonObject {
  model: IDeviceModel;
  templates: IChartTemplate[];
}

export class FileSaver {
  public static saveChartPresetsToJson(
    templates: ChartTemplate[],
    model: IDeviceModel
  ) {
    const presetsJSON = JSON.stringify(
      FileSaver.parsePresetsToJson(templates, model)
    );
    const blob = new Blob([presetsJSON], { type: "application/json" });
    saveAs(blob, "chartPresets.json");
  }

  public static saveSingleChartPresetToJson(
    preset: ChartTemplate,
    model: IDeviceModel
  ) {
    const singlePresetJSON = JSON.stringify(
      FileSaver.parsePresetsToJson([preset], model)
    ); // Przekazujemy pojedynczy preset w tablicy
    const blob = new Blob([singlePresetJSON], { type: "application/json" });
    saveAs(blob, `${preset.name || "chartPreset"}.json`);
  }

  public static parsePresetsToJson(
    chartTemplates: ChartTemplate[],
    deviceModel: IDeviceModel
  ): chartTemplateJsonObject {
    const object: chartTemplateJsonObject = {
      model: deviceModel,
      templates: chartTemplates.map((temp) => {
        const jsonTemplate: IChartTemplate = {
          id: temp.id,
          name: temp.name,
          type:
            typeof temp.type === "string"
              ? chartTypeFromString(temp.type)
              : temp.type,
          chartModel: {
            devicesHistoryValues: temp.chartModel.devicesHistoryValues,
            percentFragmentation: temp.chartModel.percentFragmentation,
            brushActive: temp.chartModel.brushActive,
            model: {
              bridges: [],
              gateways: [],
              sensors: [],
              //temporary solution, fixed in MON-84
              getDevicesCount: () => {
                return 0;
              },
            },
          },
        };
        return jsonTemplate;
      }),
    };
    return object;
  }

  public static parseJsonToChartTemplates(
    json: chartTemplateJsonObject
  ): ChartTemplate[] {
    return json.templates.map((temp) => {
      const template = new ChartTemplate(temp.name, temp.type, {
        devicesHistoryValues: temp.chartModel.devicesHistoryValues,
        model: json.model,
        percentFragmentation: temp.chartModel.percentFragmentation,
        brushActive: temp.chartModel.brushActive,
      });
      template.id = temp.id;
      return template;
    });
  }
}

export type localStorageKey = "chartPresets";

export class LocalStorageManager {
  public static loadPresetsFromLocalStorage(
    key: localStorageKey
  ): ChartTemplate[] {
    const savedPresetsItem = localStorage.getItem(key);
    if (savedPresetsItem) {
      const presets: chartTemplateJsonObject = JSON.parse(savedPresetsItem);
      return FileSaver.parseJsonToChartTemplates(presets);
    }
    return [];
  }

  public static savePresetsToLocalStorage(
    key: localStorageKey,
    presets: ChartTemplate[],
    model: IDeviceModel
  ) {
    localStorage.setItem(
      key,
      JSON.stringify(FileSaver.parsePresetsToJson(presets, model))
    );
  }

  public static saveJsonToLocalStorage(
    key: localStorageKey,
    json: chartTemplateJsonObject
  ) {
    localStorage.setItem(key, JSON.stringify(json));
  }

  public static clearLocalStorageEntry(key: localStorageKey) {
    localStorage.removeItem(key);
  }

  public static clearLocalStorage() {
    localStorage.clear();
  }
}
