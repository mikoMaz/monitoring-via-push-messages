import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { ExampleButton } from "../layout/example-button/example-button";

export const LandingPage = () => {
  return (
    <Center>
      <Grid templateRows="repeat(2, 1fr)" gap={20}>
        <GridItem>
          <Heading>Landing page</Heading>
        </GridItem>
        <GridItem>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <GridItem>
              <ExampleButton name="Example button" isLoading={false} />
            </GridItem>
            <GridItem>
              <ExampleButton name="Loading..." isLoading={true} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Center>
  );
};
