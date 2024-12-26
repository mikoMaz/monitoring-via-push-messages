import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const LandingPage = () => {
  return (
    <Center bg={UIProps.colors.background} paddingTop="100px">
      <Grid templateRows="repeat(2, 1fr)" gap={20}>
        <GridItem>
          <Heading>Welcome to our page. </Heading>
          <Heading size="lg">Hope you find everything you need.</Heading>
        </GridItem>
      </Grid>
    </Center>
  );
};
