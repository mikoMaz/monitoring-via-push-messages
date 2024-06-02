import { Center, Grid, GridItem, Heading } from "@chakra-ui/react";

export const LandingPage = () => {
  return (
    <Center>
      <Grid templateRows="repeat(2, 1fr)" gap={20}>
        <GridItem>
          <Heading>Landing page</Heading>
        </GridItem>
      </Grid>
    </Center>
  );
};
