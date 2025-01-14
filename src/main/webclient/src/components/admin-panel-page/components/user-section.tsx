import { User } from "@auth0/auth0-react";
import { Card, CardHeader, Avatar, CardBody, Heading } from "@chakra-ui/react";
import { IUserInfoResponse } from "../../../types/IUserInfoResponse";
import { getMailNickname } from "../../../types/projectTypes";

export const UserSection = ({
  user,
  userInfo,
  isLandingPage,
  companyName,
}: {
  user: User | undefined;
  userInfo: IUserInfoResponse;
  isLandingPage: boolean;
  companyName: string | undefined;
}) => {
  return (
    <Card
      variant="filled"
      bg="whiteAlpha.600"
      align="center"
      width={isLandingPage ? "100%" : "auto"} // Dynamiczna szerokość
      margin={isLandingPage ? "0 auto" : "0"} // Wyśrodkowanie, jeśli szerokość = 100%
      padding={isLandingPage ? 6 : 4} // Zwiększenie paddingu na pełnym ekranie
    >
      <CardHeader paddingBottom={-1}>
        <Avatar
          name={user?.name ?? user?.nickname ?? userInfo?.email}
          size="xl"
        />
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
        <Heading padding={1} size="sm">
          {user?.email ?? userInfo?.email ?? "No email"}
        </Heading>
        {isLandingPage ? (
          <Heading paddingTop={5} size="sm">
            Company: {companyName ?? ""}
          </Heading>
        ) : (
          <Heading paddingTop={5} size="sm">
            {userInfo.userType}
          </Heading>
        )}
      </CardBody>
    </Card>
  );
};
