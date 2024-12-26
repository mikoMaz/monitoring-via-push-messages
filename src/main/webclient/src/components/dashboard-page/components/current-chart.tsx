import { HStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { IChartTemplateModel } from "../../../types/chartTemplate";
import { createDeviceModel } from "../../../types/deviceModel";


export const CurrentChart = ({ model }: IChartTemplateModel) => {
	const deviceModel = createDeviceModel(model);

	if (model.getDevicesCount()) {
		return (
			<HStack>
			  <StatusPieChart devices={deviceModel.getSensorsArray()} heading="Sensors" />
			  <StatusPieChart devices={deviceModel.getGatewaysArray()} heading="Gateways" />
			  <StatusPieChart devices={deviceModel.getBridgesArray()} heading="Bridges" />
			</HStack>
		  );
	} else {
		return <>Invalid data</>;
	}
};
