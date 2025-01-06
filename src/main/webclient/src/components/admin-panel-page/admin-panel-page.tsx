import {
  Alert,
  AlertDescription,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  CloseButton,
  Grid,
  GridItem,
  Heading,
  HStack,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UIProps } from "../../config/config";
import { APIClient } from "../../api/api-client";
import { ICompanyUser } from "../../types/ICompanyUser";
import {
  IUserInfoResponse,
  userType,
  userTypesArray,
} from "../../types/IUserInfoResponse";
import { useAuth0 } from "@auth0/auth0-react";
import { FileSender } from "./components/file-sender";
import { ICompanyDto } from "../../types/ICompanyDto";

export const AdminPanelPage = ({
  apiClient,
  userInfo,
  accessToken,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string
}) => {
  const [companySelect, setCompanySelect] = useState<number | null>(null); // Zmieniono typ na number | null
  const [companies, setCompanies] = useState<ICompanyDto[]>([]); // Zmieniono typ na listę ICompanyDto
  const [users, setUsers] = useState<ICompanyUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<boolean>(false);

  const { user } = useAuth0();

  useEffect(() => {
    apiClient
      .getAllCompanies(accessToken)
      .then((companies: ICompanyDto[]) => setCompanies(companies));
  }, []);

  useEffect(() => {
    if (companySelect !== null) {
      apiClient.getUsersFromCompany(accessToken, companySelect).then((allUsers) => {
        setUsers(allUsers);
      });
    }
  }, [companySelect]);

  const handleCompanyChange = (event: any) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setCompanySelect(selectedCompanyId);
  };

  const handleRoleChange = (userName: string, newRole: userType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userName ? { ...user, role: newRole } : user
      )
    );
  };

  const handleSaveClick = async () => {
    if (companySelect === null) {
      console.error("Company is not selected.");
      return; 
    }
  
    setIsLoading(true);
    try {
      await apiClient.updateUsersPermissions(accessToken, users, companySelect);
      setUploadSuccess(true);
    } catch (error) {
      console.error("Error saving users:", error);
      setUploadSuccess(false);
    } finally {
      setIsLoading(false);
      setAlertInfo(true);
    }
  };
  const UserRole = () => {
    const filteredRoles = userTypesArray.filter(
      (role) => role !== "EXTERNAL" && role !== "SUPER_ADMIN"
    );

    return (
      <TableContainer>
        <Table variant="simple" width="full">
          <Thead>
            <Tr>
              <Th>User</Th>
              {filteredRoles.map((role) => (
                <Th key={role}>{role}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.name}>
                <Td>{user.name}</Td>
                {filteredRoles.map((role) => (
                  <Td key={role}>
                    <CheckboxGroup value={[user.role]}>
                      <Checkbox
                        colorScheme="primary"
                        value={role}
                        isChecked={user.role === role}
                        onChange={() => handleRoleChange(user.name, role)}
                      />
                    </CheckboxGroup>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box
      paddingLeft="47px"
      paddingRight="47px"
      bg={UIProps.colors.background}
      boxShadow="inner"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4} paddingY={10}>
        <GridItem colSpan={1}>
          {userInfo.userType === "ADMIN" ||
          userInfo.userType === "SUPER_ADMIN" ? (
            <Card variant="filled" bg="whiteAlpha.600">
              <CardHeader>
                <Heading size="md">Change roles</Heading>
              </CardHeader>
              <CardBody>
                <Select
                  placeholder="Select company"
                  value={companySelect ?? ""}
                  onChange={handleCompanyChange}
                  bg="white"
                  focusBorderColor={UIProps.colors.primary}
                >
                  {companies.map((company) => (
                    <option key={company.companyId} value={company.companyId}>
                      {company.companyName}
                    </option>
                  ))}
                </Select>
                <Card marginTop={10}>{companySelect && <UserRole />}</Card>
              </CardBody>
              <CardFooter justifyContent="flex-end">
                <HStack
                  width="100%"
                  justifyContent="flex-end"
                  alignItems="stretch"
                >
                  {alertInfo && (
                    <Alert
                      status={uploadSuccess ? "success" : "error"}
                      variant="top-accent"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                      paddingY={1}
                    >
                      <AlertIcon />
                      <AlertDescription>
                        {uploadSuccess
                          ? "Update successful."
                          : "There was problem with updating permissions. Try again."}
                      </AlertDescription>
                      <CloseButton
                        onClick={() => {
                          setAlertInfo(false);
                          setUploadSuccess(false);
                        }}
                      />
                    </Alert>
                  )}
                  {companySelect && (
                    <Button
                      colorScheme="primary"
                      isLoading={isLoading}
                      onClick={handleSaveClick}
                      size="md"
                    >
                      Save
                    </Button>
                  )}
                </HStack>
              </CardFooter>
            </Card>
          ) : null}
        </GridItem>

        <GridItem colSpan={1}>
          <VStack align="stretch">
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
                  <Heading size="md">Upload files</Heading>
                </CardHeader>
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
                </CardBody>
              </Card>
            ) : null}
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};
