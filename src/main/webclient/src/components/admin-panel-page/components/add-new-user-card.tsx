import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CloseButton,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { APIClient } from "../../../api/api-client";
import { IUserInfoResponse } from "../../../types/IUserInfoResponse";
import { UIProps } from "../../../config/config";
import { useState } from "react";
import { UnfoldLess, UnfoldMore } from "@mui/icons-material";
import { ICompanyDto } from "../../../types/ICompanyDto";

const DEFAULT_COMPANIES_LABEL = "Select company";

export const AddNewUserCard = ({
  apiClient,
  userInfo,
  accessToken,
  companies,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
  companies: ICompanyDto[];
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addingUserSuccess, setAddingUserSuccess] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<boolean>(false);
  const [cardFold, setCardFold] = useState<boolean>(true);
  const [companySelect, setCompanySelect] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const handleCompanyChange = (event: any) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setCompanySelect(isNaN(selectedCompanyId) ? null : selectedCompanyId);
  };

  const inputsValid = () => {
    return name && surname && email;
  };

  const handleSubmit = () => {
    if (companySelect) {
      setIsLoading(true);
      if (inputsValid()) {
        apiClient
          .addNewCompanyUser(accessToken, companySelect, name, surname, email)
          .then((status) => {
            if (status === 200) {
              console.log("User created successfully:", status);
              setAddingUserSuccess(true);
            } else {
              console.error("Something went wrong. Try again.");
              setAddingUserSuccess(false);
            }
          })
          .catch((error) => {
            console.error("Error adding user:", error);
          });
      }
      setAlertInfo(true);
      setIsLoading(false);
    }
  };

  return (
    <Card variant="filled" bg="whiteAlpha.600">
      <CardHeader>
        <HStack justify="space-between" alignItems="center">
          <Heading size="md">Add new user</Heading>
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
            <VStack spacing={2}>
              <Select
                placeholder={DEFAULT_COMPANIES_LABEL}
                value={companySelect ?? undefined}
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
              {companySelect ? (
                <VStack spacing={2}>
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                  <Input
                    placeholder="Surname"
                    value={surname}
                    onChange={(event) => {
                      setSurname(event.target.value);
                    }}
                  />
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </VStack>
              ) : (
                <></>
              )}
              {companySelect && (
                <Button
                  colorScheme="primary"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </VStack>
          </CardBody>
          {alertInfo && (
            <CardFooter>
              <Alert
                status={
                  inputsValid()
                    ? addingUserSuccess
                      ? "success"
                      : "error"
                    : "error"
                }
                variant="top-accent"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <AlertIcon />
                <AlertDescription>
                  {inputsValid()
                    ? addingUserSuccess
                      ? `User added successfully.`
                      : `There was a problem with adding new user "${name} ${surname}". Try again.`
                    : "Inputs cannot be empty"}
                </AlertDescription>
                <CloseButton
                  onClick={() => {
                    setAlertInfo(false);
                    setAddingUserSuccess(false);
                  }}
                />
              </Alert>
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};
