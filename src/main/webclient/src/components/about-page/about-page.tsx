import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const AboutPage = () => {
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center paddingTop={25} >
        <Grid templateRows="repeat(2, 1fr)" gap={20}>
          <GridItem>
            <Heading size="lg">
              Right now, we don't have information on this page.
            </Heading>
            <Heading size="md">
              Check here later.
            </Heading>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};
