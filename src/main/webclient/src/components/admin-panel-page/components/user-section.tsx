import { User } from "@auth0/auth0-react";
import { Card, CardHeader, Avatar, CardBody, Heading } from "@chakra-ui/react";
import { IUserInfoResponse } from "../../../types/IUserInfoResponse";
import { getMailNickname } from '../../../types/projectTypes';

export const UserSection = ({
  user,
  userInfo,
}: {
  user: User | undefined;
  userInfo: IUserInfoResponse;
}) => {
  return (
    <Card variant="filled" bg="whiteAlpha.600" align="center">
      <CardHeader paddingBottom={-1}>
        <Avatar name={user?.name ?? user?.nickname ?? user?.mail} size="xl" />
      </CardHeader>
      <CardBody
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading padding={1} size="lg">
          {getMailNickname(userInfo.email) ?? user?.name ?? "You"}
        </Heading>
        {/* <Heading padding={1} size="md">{user?.nickname ?? "No nickname"}</Heading> */}
        <Heading padding={1} size="sm">
          {user?.email ?? userInfo?.email ?? "No email"}
        </Heading>
        <Heading paddingTop={5} size="sm">
          {userInfo.userType}
        </Heading>
      </CardBody>
    </Card>
  );
};
