import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";
import { UserInstructions } from "./user-instructions-pl";

export const AboutPage = () => {
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center paddingTop={25} >
        <UserInstructions />
      </Center>
    </Box>
  );
};
