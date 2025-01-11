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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!inputsValid()) {
      setAlertInfo(true);
      setAddingUserSuccess(false);
      return;
    }

    if (!validateEmail(email)) {
      setAlertInfo(true);
      setAddingUserSuccess(false);
      console.error("Invalid email format.");
      return;
    }

    if (companySelect) {
      setIsLoading(true);
      try {
        const status = await apiClient.addNewCompanyUser(
          accessToken,
          companySelect,
          name,
          surname,
          email
        );
        if (status === 200) {
          setAddingUserSuccess(true);
          setName("");
          setSurname("");
          setEmail("");
        } else {
          setAddingUserSuccess(false);
        }
      } catch (error) {
        console.error("Error adding user:", error);
        setAddingUserSuccess(false);
      } finally {
        setIsLoading(false);
        setAlertInfo(true);
      }
    }
  };

  const InputSection = (
    placeholder: string,
    value: string,
    setValue: (val: string) => void,
    validate?: (val: string) => boolean
  ) => {
    const isInvalid = validate ? !validate(value) : false;

    return (
      <HStack align="center" spacing={4} width="100%">
        <Heading size="sm" width={90}>{`${placeholder}:`}</Heading>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setAlertInfo(false);
          }}
          width="100%"
          bg="white"
          focusBorderColor={isInvalid ? "red" : UIProps.colors.primary}
          borderColor={isInvalid ? "red" : undefined}
        />
      </HStack>
    );
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
            <VStack spacing={8} justifyContent="flex-end">
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
                <VStack spacing={2} width="100%">
                  {InputSection("Name", name, setName)}
                  {InputSection("Surname", surname, setSurname)}
                  {InputSection("Email", email, setEmail, validateEmail)}
                </VStack>
              ) : (
                <></>
              )}
            </VStack>
          </CardBody>
          <CardFooter justifyContent="flex-end">
            <HStack width="100%" justifyContent="flex-end" alignItems="stretch">
              {alertInfo && (
                <Alert
                  status={addingUserSuccess ? "success" : "error"}
                  variant="top-accent"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                  paddingY={1}
                >
                  <AlertIcon />
                  <AlertDescription>
                    {addingUserSuccess
                      ? `User added successfully.`
                      : !inputsValid()
                      ? "All fields are required."
                      : !validateEmail(email)
                      ? "Invalid email format."
                      : `There was a problem with adding user "${name} ${surname}".`}
                  </AlertDescription>
                  <CloseButton
                    onClick={() => {
                      setAlertInfo(false);
                      setAddingUserSuccess(false);
                    }}
                  />
                </Alert>
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
            </HStack>
          </CardFooter>
        </>
      )}
    </Card>
  );
};
