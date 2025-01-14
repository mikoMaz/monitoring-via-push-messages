import { Box, Center, Grid, GridItem, Heading } from "@chakra-ui/react";
import { UIProps } from "../../config/config";
import { User } from "@auth0/auth0-react";
import { IUserInfoResponse } from "../../types/IUserInfoResponse";
import { UserSection } from "../admin-panel-page/components/user-section";

export const LandingPage = ({
  user,
  userInfo,
  companyName,
}: {
  user: User | undefined;
  userInfo: IUserInfoResponse;
  companyName: string | undefined;
}) => {
  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Center paddingTop={25} h="75vh">
        <UserSection
          user={user}
          userInfo={userInfo}
          isLandingPage={true}
          companyName={companyName}
        />
      </Center>
    </Box>
  );
};
