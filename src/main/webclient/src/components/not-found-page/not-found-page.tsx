import { Box } from "@chakra-ui/react";
import { UIProps } from "../../config/config";

export const NotFoundPage = () => {
  document.body.style.backgroundColor = UIProps.colors.background;
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <div>Not found</div>
    </Box>
  );
};
