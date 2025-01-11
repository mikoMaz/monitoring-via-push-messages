import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
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
import { useEffect, useState } from "react";
import { ICompanyDto } from "../../../types/ICompanyDto";
import { UnfoldLess, UnfoldMore } from "@mui/icons-material";

export const SecretChanger = ({
  apiClient,
  userInfo,
  accessToken,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
}) => {
  const [companySelect, setCompanySelect] = useState<number | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [companies, setCompanies] = useState<ICompanyDto[]>([]);
  const [newSecret, setNewSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<boolean>(false);
  const [cardFold, setCardFold] = useState<boolean>(true);

  useEffect(() => {
    apiClient.getAllCompanies(accessToken).then((companies: ICompanyDto[]) => {
      setCompanies(companies);
      if (companies.length > 0) {
        const firstCompany = companies[0];
        setCompanySelect(firstCompany.companyId);
        setCompanyName(firstCompany.companyName);
      }
    });
  }, []);

  const handleCompanyChange = (event: any) => {
    const selectedCompanyId = parseInt(event.target.value, 10);
    setCompanySelect(selectedCompanyId);
    const selectedCompany = companies.find(
      (company) => company.companyId === selectedCompanyId
    );
    if (selectedCompany) {
      setCompanyName(selectedCompany.companyName);
    }
  };

  const handleSubmit = () => {
    if (companySelect && newSecret) {
      setIsLoading(true);
      apiClient
        .postChangeCompanySecret(accessToken, companySelect, newSecret)
        .then((status) => {
          if (status === 200) {
            console.log("Secret changed successfully:", status);
            setNewSecret("");
            setChangeSuccess(true);
          } else {
            console.error("Something went wrong. Try again.");
            setChangeSuccess(false);
          }
        })
        .catch((error) => {
          console.error("Error changing secret:", error);
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
          <Heading size="md">Change secret</Heading>
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
            <VStack spacing={10}>
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
              {companySelect && (
                <HStack spacing={4} alignItems="stretch" width="100%">
                  <Input
                    placeholder="New secret"
                    value={newSecret}
                    onChange={(event) => setNewSecret(event.target.value)}
                    focusBorderColor={UIProps.colors.primary}
                    bg="white"
                  />
                  <Button
                    colorScheme="primary"
                    onClick={handleSubmit}
                    isLoading={isLoading}
                  >
                    Submit
                  </Button>
                </HStack>
              )}
            </VStack>
          </CardBody>
          {alertInfo && (
            <CardFooter>
              <Alert
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
                    ? `Successful change for "${companyName}".`
                    : `There was a problem with changing the secret for "${companyName}"`}
                </AlertDescription>
                <CloseButton
                  onClick={() => {
                    setAlertInfo(false);
                    setChangeSuccess(false);
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
