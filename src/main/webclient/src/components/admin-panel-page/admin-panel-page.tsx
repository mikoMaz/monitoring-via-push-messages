import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { InfoOutlined, Send, Upload } from "@mui/icons-material";
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

export const AdminPanelPage = ({
  apiClient,
  userInfo,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
}) => {
  const [companySelect, setCompanySelect] = useState<string>("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [users, setUsers] = useState<ICompanyUser[]>([]);
  const [fileDevicesName, setFileDevicesName] =
    useState<string>("No file detected");
  const [fileHierarchyName, setFileHierarchyName] =
    useState<string>("No file detected");
  const [fileAlertsName, setFileAlertsName] =
    useState<string>("No file detected");
  const [fileDevices, setFileDevices] = useState<File | null>(null);
  const [fileHierarchy, setFileHierarchy] = useState<File | null>(null);
  const [fileAlerts, setFileAlerts] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth0();

  useEffect(() => {
    apiClient.getAllCompanies().then((companies) => setCompanies(companies));
  }, []);

  useEffect(() => {
    if (companySelect) {
      apiClient.getUsersFromCompany().then((allUsers) => {
        const usersForSelectedCompany = allUsers.filter(
          (user) => user.company === companySelect
        );
        setUsers(usersForSelectedCompany);
      });
    }
  }, [companySelect]);

  const handleCompanyChange = (event: any) => {
    const selectedCompany = event.target.value;
    setCompanySelect(selectedCompany);
  };

  const handleRoleChange = (userName: string, newRole: userType) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === userName ? { ...user, role: newRole } : user
      )
    );
  };

  const handleFileDevicesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileDevices(selectedFile);
      setFileDevicesName(selectedFile.name);
    }
  };

  const handleFileHierarchyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileHierarchy(selectedFile);
      setFileHierarchyName(selectedFile.name);
    }
  };

  const handleFileAlertsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFileAlerts(selectedFile);
      setFileAlertsName(selectedFile.name);
    }
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // await apiClient.saveUsers(users);
    } catch (error) {
      console.error("Error saving users:", error);
    } finally {
      setIsLoading(false);
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
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={4}
      padding={10}
      bg={UIProps.colors.background}
    >
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
                value={companySelect}
                onChange={handleCompanyChange}
                bg="white"
                focusBorderColor={UIProps.colors.primary}
              >
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </Select>
              <Card marginTop={10}>{companySelect && <UserRole />}</Card>
            </CardBody>
            <CardFooter justifyContent="flex-end">
              {companySelect && (
                <Button
                  colorScheme="primary"
                  isLoading={isLoading} // Add loading state
                  onClick={handleSaveClick} // Attach click handler
                >
                  Save
                </Button>
              )}
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
          <Card variant="filled" bg="whiteAlpha.600">
            <CardHeader>
              <Heading size="md">Upload files</Heading>
            </CardHeader>
            <CardBody paddingX="120px">
              <VStack spacing={4} align="stretch">
                {/* Devices */}
                <FileSender
                  title="Devices"
                  label="Devices"
                  fileName={fileDevicesName}
                  handleFileChange={handleFileDevicesChange}
                ></FileSender>
                {/* Hierarchy */}
                <FileSender
                  title="Hierarchy"
                  label="Set hierarchy tree for devices in the company"
                  fileName={fileHierarchyName}
                  handleFileChange={handleFileHierarchyChange}
                ></FileSender>
                {/* Alerts */}
                <FileSender
                  title="Alerts"
                  label="Create new alert for devices"
                  fileName={fileAlertsName}
                  handleFileChange={handleFileAlertsChange}
                ></FileSender>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </GridItem>
    </Grid>
  );
};
