import { HStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { IChartTemplateModel, IChartTemplateModelDrawing } from "../../../types/chartTemplate";
import { createDeviceModel } from "../../../types/deviceModel";


export const CurrentChart = ({ model, devicesHistoryValues }: IChartTemplateModelDrawing) => {
	const deviceModel = createDeviceModel(model);

	if (devicesHistoryValues.length) {
		return (
			<HStack>
			  <StatusPieChart devices={deviceModel.getSensorsArray()} heading="Sensors" />
			  <StatusPieChart devices={deviceModel.getGatewaysArray()} heading="Gateways" />
			  <StatusPieChart devices={deviceModel.getBridgesArray()} heading="Bridges" />
			</HStack>
		  );
	} else {
		return <>No data</>;
	}
};
