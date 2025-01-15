import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { UIProps } from "../../config/config";
import { APIClient } from "../../api/api-client";
import { IUserInfoResponse } from "../../types/IUserInfoResponse";
import { useAuth0 } from "@auth0/auth0-react";
import { FileSender } from "./components/file-sender";
import { PermissionChanger } from "./components/permission-changer";
import { SecretChanger } from "./components/secret-changer";
import { useEffect, useState } from "react";
import { NewCompanyCard } from "./components/new-company-card";
import { UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { AddNewUserCard } from "./components/add-new-user-card";
import { ICompanyDto } from "../../types/ICompanyDto";
import { UserSection } from "./components/user-section";
import { DownloadFileCard } from "./components/download-json-card";

export const AdminPanelPage = ({
  apiClient,
  userInfo,
  accessToken,
  companies,
  refreshCompaniesList
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
  companies: ICompanyDto[];
  refreshCompaniesList: () => Promise<void>;
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
            {["ADMIN", "SUPER_ADMIN"].includes(userInfo.userType) ? (
              <PermissionChanger
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
                companies={companies}
              />
            ) : (
              <></>
            )}
            {/* Change company secret for preview  */}
            {["ADMIN", "SUPER_ADMIN"].includes(userInfo.userType) ? (
              <SecretChanger
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
                companies={companies}
              />
            ) : (
              <></>
            )}
            {/* Add new company  */}
            {userInfo.userType === "SUPER_ADMIN" ? (
              <NewCompanyCard
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
                refreshCompanies={refreshCompaniesList}
              />
            ) : (
              <></>
            )}
          </VStack>
        </GridItem>

        <GridItem colSpan={1}>
          <VStack align="stretch" spacing={4}>
            <UserSection user={user} userInfo={userInfo} isLandingPage={false} companyName={""}/>
            {["ADMIN", "SUPER_ADMIN"].includes(userInfo.userType) ? (
              <DownloadFileCard
                companies={companies}
              />
            ) : (
              <></>
            )}
            {userInfo.userType === "SUPER_ADMIN" ? (
              <Card variant="filled" bg="whiteAlpha.600">
                <CardHeader>
                  <HStack justify="space-between" alignItems="center">
                    <Heading size="md">Upload files</Heading>
                    <IconButton
                      aria-label="(un)fold-card"
                      color={UIProps.colors.primary}
                      icon={cardFold ? <UnfoldLess /> : <UnfoldMore />}
                      onClick={() => setCardFold(!cardFold)}
                      bg="whiteAlpha.50"
                    />
                  </HStack>
                </CardHeader>
                {cardFold && (
                  <>
                    <CardBody>
                      <VStack spacing={4} align="stretch">
                        {/* Devices */}
                        <FileSender
                          title="Devices"
                          label="Set which company has which devices"
                          type="device"
                          apiClient={apiClient}
                          accessToken={accessToken}
                        />
                        {/* Hierarchy */}
                        <FileSender
                          title="Hierarchy"
                          label="Set hierarchy tree for devices in the company"
                          type="hierarchy"
                          apiClient={apiClient}
                          accessToken={accessToken}
                        />
                        {/* Alerts */}
                        <FileSender
                          title="Alerts"
                          label="Create new alert for devices"
                          type="alert"
                          apiClient={apiClient}
                          accessToken={accessToken}
                        />
                      </VStack>
                    </CardBody>{" "}
                  </>
                )}
              </Card>
            ) : (
              <></>
            )}
            {userInfo.userType === "SUPER_ADMIN" ? (
              <AddNewUserCard
                apiClient={apiClient}
                userInfo={userInfo}
                accessToken={accessToken}
                companies={companies}
                refreshCompanies={refreshCompaniesList}
              />
            ) : (
              <></>
            )}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
