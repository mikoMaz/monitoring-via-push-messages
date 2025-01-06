import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Select,
  CardFooter,
  HStack,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  Button,
  Checkbox,
  CheckboxGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { useEffect, useState } from "react";
import { ICompanyDto } from "../../../types/ICompanyDto";
import {
  IUserInfoResponse,
  userType,
  userTypesArray,
} from "../../../types/IUserInfoResponse";
import { APIClient } from "../../../api/api-client";
import { ICompanyUser } from "../../../types/ICompanyUser";

export const PermissionChanger = ({
  apiClient,
  userInfo,
  accessToken,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
}) => {
  const [companySelect, setCompanySelect] = useState<number | null>(null);
  const [users, setUsers] = useState<ICompanyUser[]>([]);
  const [companies, setCompanies] = useState<ICompanyDto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<boolean>(false);
  const [cardFold, setCardFold] = useState<boolean>(true);

  useEffect(() => {
    apiClient.getAllCompanies(accessToken).then((companies: ICompanyDto[]) => {
      setCompanies(companies);
      if (companies.length > 0) {
        const firstCompany = companies[0];
        setCompanySelect(firstCompany.companyId);
      }
    });
  }, []);

  useEffect(() => {
    if (companySelect !== null) {
      apiClient
        .getUsersFromCompany(accessToken, companySelect)
        .then((allUsers) => {
          setUsers(allUsers);
        });
    }
  }, [companySelect, accessToken, apiClient]);

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
    <Card variant="filled" bg="whiteAlpha.600">
      <CardHeader>
        <HStack justify="space-between" alignItems="center">
          <Heading size="md">Change roles</Heading>
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
            <HStack width="100%" justifyContent="flex-end" alignItems="stretch">
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
        </>
      )}
    </Card>
  );
};
