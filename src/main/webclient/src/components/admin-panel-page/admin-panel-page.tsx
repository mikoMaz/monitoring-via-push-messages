import {
  Card,
  CardBody,
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
  const [fileName, setFileName] = useState<string>("no file detected");
  const [file, setFile] = useState<File | null>(null);

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  //   const handleSendFile = () => {
  //     if (file) {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       apiClient
  //         .uploadFile(formData)
  //         .then((response) => {
  //           console.log("File uploaded successfully", response);
  //         })
  //         .catch((error) => {
  //           console.error("Error uploading file", error);
  //         });
  //     }
  //   };

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
        <Card variant="filled" bg="whiteAlpha.600">
          <CardHeader><Heading size='md'>Upload new devices</Heading></CardHeader>
          <CardBody>
            <HStack spacing={4} justify="center">
              <Text>{fileName}</Text>
              <Tooltip label="Upload" aria-label="Upload tooltip">
                <IconButton
                  icon={<Upload />}
                  colorScheme="primary"
                  onClick={() => document.getElementById("file-input")?.click()}
                  aria-label="Upload"
                />
              </Tooltip>
              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                accept=".csv"
                onChange={handleFileChange}
              />
              <Tooltip label="Send" aria-label="Send tooltip">
                <IconButton
                  icon={<Send />}
                  colorScheme="primary"
                  //   onClick={handleSendFile}
                  aria-label="Send"
                />
              </Tooltip>
            </HStack>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
};
