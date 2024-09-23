import { HStack } from "@chakra-ui/react";
import { StatusPieChart } from "./status-pie-chart";
import { IChartTemplateModel } from "../../../types/chartTemplate";


export const CurrentChart = ({ model, devicesHistoryValues }: IChartTemplateModel) => {
	if (devicesHistoryValues.length) {
		return (
			<HStack>
			  <StatusPieChart devices={model.getSensorsArray()} heading="Sensors" />
			  <StatusPieChart devices={model.getGatewaysArray()} heading="Gateways" />
			  <StatusPieChart devices={model.getBridgesArray()} heading="Bridges" />
			</HStack>
		  );
	} else {
		return <>No data</>;
	}
};
