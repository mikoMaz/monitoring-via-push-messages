import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const UserRejectedPage = ({ email }: { email: string }) => {
  document.body.style.backgroundColor = UIProps.colors.background;
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center>
        <Grid templateRows="repeat(2, 1fr)" gap={20}>
          <GridItem>
            <Heading>{`User ${email} doesn't have necessary rights to view this page`}</Heading>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};
