import { Card, FormControl, FormLabel, Switch } from "@chakra-ui/react";

export const SetDisplayAlerts = ({
  alertsEnabled,
  setAlertsEnabled,
}: {
  alertsEnabled: boolean;
  setAlertsEnabled: (value: boolean) => void;
}) => {
  return (
    <Card padding={2}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="alerts-switch" mb="0">
          Application alerts enabled
        </FormLabel>
        <Switch
          id="alerts-switch"
          colorScheme="primary"
          isChecked={alertsEnabled}
          onChange={(e) => {
            setAlertsEnabled(!alertsEnabled);
          }}
        />
      </FormControl>
    </Card>
  );
};
