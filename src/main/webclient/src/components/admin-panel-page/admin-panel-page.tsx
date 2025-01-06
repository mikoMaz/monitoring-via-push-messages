import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { UIProps } from "../../config/config";
import { APIClient } from "../../api/api-client";
import { IUserInfoResponse } from "../../types/IUserInfoResponse";
import { useAuth0 } from "@auth0/auth0-react";
import { FileSender } from "./components/file-sender";
import { PermissionChanger } from "./components/permission-changer";
import { SecretChanger } from "./components/secret-changer";
import { useState } from "react";
import { NewCompanyCard } from "./components/new-company-card";

export const AdminPanelPage = ({
  apiClient,
  userInfo,
  accessToken,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
}) => {
  const { user } = useAuth0();
  const [cardFold, setCardFold] = useState<boolean>(true);

  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4} paddingY={10}>
        <GridItem colSpan={1}>
          <VStack align="stretch" spacing={4}>
            {/* Role changer  */}
            {userInfo.userType === "ADMIN" ||
            userInfo.userType === "SUPER_ADMIN" ? (
              <PermissionChanger
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
              />
            ) : null}
            {/* Change company secret for preview  */}
            {userInfo.userType === "ADMIN" ||
            userInfo.userType === "SUPER_ADMIN" ? (
              <SecretChanger
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
              />
            ) : null}
            {/* Add new company  */}
            {userInfo.userType === "SUPER_ADMIN" ? (
              <NewCompanyCard
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
              />
            ) : null}
          </VStack>
        </GridItem>

        <GridItem colSpan={1}>
          <VStack align="stretch" spacing={4}>
            <Card variant="filled" bg="whiteAlpha.600" align="center">
              <CardHeader paddingBottom={-1}>
                <Avatar
                  name={user?.name ?? user?.nickname ?? user?.mail}
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
                  {user?.name ?? "You"}
                </Heading>
                {/* <Heading padding={1} size="md">{user?.nickname ?? "No nickname"}</Heading> */}
                <Heading padding={1} size="sm">
                  {user?.email ?? "No email"}
                </Heading>
                <Heading paddingTop={5} size="sm">
                  {userInfo.userType}
                </Heading>
              </CardBody>
            </Card>
            {userInfo.userType === "SUPER_ADMIN" ? (
              <Card variant="filled" bg="whiteAlpha.600">
                <CardHeader>
                  <HStack justify="space-between" alignItems="center">
                    <Heading size="md">Upload files</Heading>
                    <Button
                      variant="link"
                      colorScheme="green"
                      onClick={() => setCardFold(!cardFold)}
                    >
                      {cardFold ? "Fold" : "Unfold"}
                    </Button>
                  </HStack>
                </CardHeader>
                {cardFold && (
                  <>
                    <CardBody paddingX="60px">
                      <VStack spacing={4} align="stretch">
                        {/* Devices */}
                        <FileSender
                          title="Devices"
                          label="Devices"
                          type="device"
                          apiClient={apiClient}
                        />
                        {/* Hierarchy */}
                        <FileSender
                          title="Hierarchy"
                          label="Set hierarchy tree for devices in the company"
                          type="hierarchy"
                          apiClient={apiClient}
                        />
                        {/* Alerts */}
                        <FileSender
                          title="Alerts"
                          label="Create new alert for devices"
                          apiClient={apiClient}
                        />
                      </VStack>
                    </CardBody>{" "}
                  </>
                )}
              </Card>
            ) : null}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
