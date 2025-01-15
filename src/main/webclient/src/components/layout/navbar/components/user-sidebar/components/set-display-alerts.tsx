import { Divider, HStack, Switch, Text, VStack } from "@chakra-ui/react";

export const SetDisplayAlerts = ({
  alertsEnabled,
  setAlertsEnabled,
}: {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
}) => {
  return (
    <VStack width="100%" spacing={4} paddingY={2} alignItems="flex-start">
      <HStack
        spacing={8}
        alignItems="center"
        justifyContent="flex-start"
        paddingBottom={4}
      >
        <Text>Application alerts enabled</Text>
        <Switch
          id="alerts-switch"
          colorScheme="primary"
          isChecked={alertsEnabled}
          onChange={(e) => {
            setAlertsEnabled(!alertsEnabled);
          }}
        />
      </HStack>
      <Divider borderColor={"grey"} />
    </VStack>
  );
};
