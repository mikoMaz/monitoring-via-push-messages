import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserInfoResponse } from "../../types/IUserInfoResponse";

export const UserRejectedPage = ({
  userInfo,
}: {
  userInfo: IUserInfoResponse;
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = UIProps.colors.background;
    if (!["EXTERNAL", "READ_ONLY"].includes(userInfo.userType)) {
      navigate("/application", { replace: true });
    }
  }, [location, navigate, userInfo]);

  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center h="100vh">
        <Grid templateRows="repeat(2, 1fr)" gap={20}>
          <GridItem>
            <Heading>{`User ${userInfo.email ?? ""} doesn't have necessary rights to view this page`}</Heading>
          </GridItem>
        </Grid>
      </Center>
    </Box>
  );
};
