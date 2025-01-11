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
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);
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

  const handleSubmit = () => {
    if (companySelect) {
      setIsLoading(true);
      apiClient
        .addNewCompanyUser(accessToken, companySelect, name, surname, email)
        .then((status) => {
          if (status === 200) {
            console.log("Company created successfully:", status);
            setChangeSuccess(true);
          } else {
            console.error("Something went wrong. Try again.");
            setChangeSuccess(false);
          }
        })
        .catch((error) => {
          console.error("Error adding company:", error);
        })
        .finally(() => {
          setIsLoading(false);
          setAlertInfo(true);
        });
    } else {
      console.log("Please provide a new secret.");
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
              {/* <Alert
                status={changeSuccess ? "success" : "error"}
                variant="top-accent"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <AlertIcon />
                <AlertDescription>
                  {changeSuccess
                    ? `Successful adding new company.`
                    : `There was a problem with adding new company "${newCompanyName}". Try again.`}
                </AlertDescription>
                <CloseButton
                  onClick={() => {
                    setAlertInfo(false);
                    setChangeSuccess(false);
                  }}
                />
              </Alert> */}
            </CardFooter>
          )}
        </>
      )}
    </Card>
  );
};
