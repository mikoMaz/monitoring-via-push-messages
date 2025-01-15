import { Box, Heading, Text, Code, List, ListItem } from "@chakra-ui/react";

export const UserInstructions = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6}>
        User Documentation
      </Heading>
      <Heading as="h2" size="lg" mt={6} mb={4}>
        Description
      </Heading>
      <Text mb={4}>
        The application consists of two segments: <Code>/preview</Code> and{" "}
        <Code>/application</Code>. Both subsections serve unauthenticated and
        authenticated users, respectively. They present the current status of
        the company's devices, differing in the level of data detail.
        Additionally, <Code>/application</Code> includes an admin panel for
        authorized users to modify various company parameters.
      </Text>

      <Heading as="h2" size="lg" mt={6} mb={4}>
        /preview
      </Heading>
      <Text mb={4}>
        The <Code>/preview</Code> section does not require user authentication.
        Proper access is granted when the company is specified via URL
        parameters, e.g.:
      </Text>
      <Code display="block" mb={4}>
        https://errwarn.projektstudencki.pl/preview?context=test-company
      </Code>
      <Text mb={4}>
        The user is prompted to provide the secret for the specified company.
        Upon successful secret validation, access is granted. The page view
        consists of a component displaying the company name, the number of
        available devices, and two charts presenting the current status of the
        company’s devices.
      </Text>
      <Text mb={4}>
        <Code>Preview</Code> does not refresh automatically; the displayed data
        reflects the most recent state at the time of page load. To update the
        data, the browser tab must be refreshed.
      </Text>

      <Heading as="h2" size="lg" mt={6} mb={4}>
        /application
      </Heading>
      <Text mb={4}>
        <Code>/application</Code> consists of three key subsections:{" "}
        <Code>/monitoring</Code>, <Code>/dashboard</Code>, and{" "}
        <Code>/admin</Code>. The entire application refreshes every 3 minutes to
        display the latest data.
      </Text>

      <Heading as="h3" size="md" mt={4} mb={3}>
        /monitoring
      </Heading>
      <Text mb={4}>
        <Code>/monitoring</Code> includes interactive tables listing devices:
      </Text>
      <Code display="block" mb={4}>
        https://errwarn.projektstudencki.pl/application/monitoring?view=allDevices
      </Code>
      <List spacing={2} mb={4}>
        <ListItem>
          <Code>All Devices</Code>: All devices arranged in a parent-child
          hierarchy according to the grouping rules defined in the business
          model. Rows with grouping devices are collapsible.
        </ListItem>
        <ListItem>
          <Code>Bridges, Gateways, Sensors</Code>: Separate tables for devices
          based on type.
        </ListItem>
      </List>
      <Text mb={4}>
        The <Code>view</Code> parameter in the URL changes based on the selected
        device view. Devices can be sorted and filtered by <Code>id</Code>.
        Clicking on a specific device redirects the user to the device view,
        where they can find basic information about the selected device and a
        chart of its activity.
      </Text>

      <Heading as="h3" size="md" mt={4} mb={3}>
        /dashboard
      </Heading>
      <Text mb={4}>
        <Code>/dashboard</Code> is a view of device charts and a custom chart
        creator. The first three tabs (<Code>Current</Code>, <Code>Recent</Code>
        , <Code>History</Code>) are the main charts representing the company’s
        device status. The <Code>Custom</Code> tab contains the chart creator,
        allowing users to create their own chart "presets" with personalized
        parameters like data granularity or device type filters.
      </Text>
      <Text mb={4}>
        Presets are saved in the browser’s <Code>localStorage</Code>, so they
        remain visible after reloading the page. To view them on another device,
        users can export the chart to a JSON file, which can be imported into
        the creator.
      </Text>

      <Heading as="h3" size="md" mt={4} mb={3}>
        /admin
      </Heading>
      <Text mb={4}>
        <Code>/admin</Code> is a section reserved for company owners and
        privileged users. Even if the URL is manually entered, users without the
        required permissions will not gain access to the admin panel. Depending
        on their permissions, users will see only certain options.
      </Text>
      <List spacing={2} mb={4}>
        <ListItem>
          The company owner (<Code>ADMIN</Code>) can change the permissions of
          users assigned to their company and update the company secret used in
          the <Code>/preview</Code> section.
        </ListItem>
        <ListItem>
          A privileged user (<Code>SUPER_ADMIN</Code>) has the same options plus
          the ability to add companies and users to companies. Additionally,
          they have access to a <Code>.csv</Code> file upload section, which
          allows assigning devices to companies, setting dependencies between
          devices in a company, and creating alerts notifying of device
          inactivity.
        </ListItem>
      </List>
    </Box>
  );
};
