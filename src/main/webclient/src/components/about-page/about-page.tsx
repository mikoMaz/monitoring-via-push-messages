import { Box, Center } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const AboutPage = () => {
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center>About</Center>
    </Box>
  );
};
