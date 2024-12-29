import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
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
import { Send, Upload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { UIProps } from "../../config/config";
import { APIClient } from "../../api/api-client";
import { ICompanyUser } from "../../types/ICompanyUser";
import { userType, userTypesArray } from "../../types/IUserInfoResponse";

export const AdminPanelPage = ({ apiClient }: { apiClient: APIClient }) => {
  const [companySelect, setCompanySelect] = useState<string>("");
  const [companies, setCompanies] = useState<string[]>([]);
  const [users, setUsers] = useState<ICompanyUser[]>([]);

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

  const UserRole = () => {
    return (
      <TableContainer>
        <Table variant="simple" width="full">
          <Thead>
            <Tr>
              <Th>User</Th>
              {userTypesArray.map((role) => (
                <Th key={role}>{role}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.name}>
                <Td>{user.name}</Td>
                {userTypesArray.map((role) => (
                  <Td key={role}>
                    <CheckboxGroup value={[user.role]}>
                      <Checkbox colorScheme="primary"
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
        <Card variant="filled" bg="whiteAlpha.600">
          <CardHeader>
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
          </CardHeader>
          <CardBody>
            <Card>{companySelect && <UserRole />}</Card>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem colSpan={1}>
        <HStack spacing={4} justify="center">
          <Text>file</Text>
          <Tooltip label="Import" aria-label="Import tooltip">
            <IconButton
              icon={<Upload />}
              colorScheme="primary"
              onClick={() => console.log("Import clicked")}
              aria-label="Import"
            />
          </Tooltip>
          <Tooltip label="Send" aria-label="Send tooltip">
            <IconButton
              icon={<Send />}
              colorScheme="primary"
              onClick={() => console.log("Send clicked")}
              aria-label="Send"
            />
          </Tooltip>
        </HStack>
      </GridItem>
    </Grid>
  );
};
