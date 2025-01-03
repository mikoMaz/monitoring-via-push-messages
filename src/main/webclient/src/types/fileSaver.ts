import saveAs from "file-saver";
import {
  ChartTemplate,
  chartTypeFromString,
  IChartTemplate,
} from "./chartTemplate";

export interface chartTemplateJsonObject {
  templates: IChartTemplate[];
}

export class FileSaver {
  public static saveChartPresetsToJson(templates: ChartTemplate[]) {
    const presetsJSON = JSON.stringify(FileSaver.parsePresetsToJson(templates));
    const blob = new Blob([presetsJSON], { type: "application/json" });
    saveAs(blob, "chartPresets.json");
  }

  public static saveSingleChartPresetToJson(preset: ChartTemplate) {
    const singlePresetJSON = JSON.stringify(
      FileSaver.parsePresetsToJson([preset])
    ); // Przekazujemy pojedynczy preset w tablicy
    const blob = new Blob([singlePresetJSON], { type: "application/json" });
    saveAs(blob, `${preset.name || "chartPreset"}.json`);
  }

  public static parsePresetsToJson(
    chartTemplates: ChartTemplate[]
  ): chartTemplateJsonObject {
    const object: chartTemplateJsonObject = {
      templates: chartTemplates.map((temp) => {
        const jsonTemplate: IChartTemplate = {
          id: temp.id,
          name: temp.name,
          type:
            typeof temp.type === "string"
              ? chartTypeFromString(temp.type)
              : temp.type,
          chartModel: {
            percentFragmentation: temp.chartModel.percentFragmentation,
            brushActive: temp.chartModel.brushActive,
            deviceTypes: temp.chartModel.deviceTypes,
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
        percentFragmentation: temp.chartModel.percentFragmentation,
        brushActive: temp.chartModel.brushActive,
        deviceTypes: temp.chartModel.deviceTypes,
      });
      template.id = temp.id;
      return template;
    });
  }
}
