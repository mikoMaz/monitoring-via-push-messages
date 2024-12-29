import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Select,
  Spacer,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { Upload } from "@mui/icons-material";
import { UIProps } from "../../config/config";

export const AdminPanelPage = () => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      padding={10}
      bg={UIProps.colors.background}
    >
      <GridItem colSpan={1}>
        <VStack>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </VStack>
      </GridItem>
      <GridItem colSpan={1}>
        <HStack spacing={4} justify="center">
          <Text>file</Text>
          <Tooltip label="Import" aria-label="Import tooltip">
            <IconButton
              icon={<Upload />}
              colorScheme="primary"
              onClick={() => console.log("Import clicked")}
              aria-label="Import"
            />
          </Tooltip>
        </HStack>
      </GridItem>
    </Grid>
  );
};
