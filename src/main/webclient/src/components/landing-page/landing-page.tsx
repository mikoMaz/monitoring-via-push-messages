import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const LandingPage = () => {
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center paddingTop={25}>
        <Grid templateRows="repeat(2, 1fr)" gap={20}>
          <GridItem>
            <Heading>Welcome to our page. </Heading>
            <Heading size="lg">Hope you find everything you need.</Heading>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};
