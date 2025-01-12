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
} from "@chakra-ui/react";
import { APIClient } from "../../../api/api-client";
import { IUserInfoResponse } from "../../../types/IUserInfoResponse";
import { UIProps } from "../../../config/config";
import { useState } from "react";
import { UnfoldLess, UnfoldMore } from "@mui/icons-material";

export const NewCompanyCard = ({
  apiClient,
  userInfo,
  accessToken,
  refreshCompanies
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
  refreshCompanies: () => Promise<void>;
}) => {
  const [newCompanyName, setNewCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<boolean>(false);
  const [cardFold, setCardFold] = useState<boolean>(true);

  const handleInputChange = (event: any) => {
    setNewCompanyName(event.target.value);
  };

  const handleSubmit = async () => {
    if (newCompanyName) {
      setIsLoading(true);
      await apiClient
        .postAddCompany(accessToken, newCompanyName)
        .then((status) => {
          if (status === 200) {
            console.log("Company created successfully:", status);
            setNewCompanyName("");
            setChangeSuccess(true);
          } else {
            console.error("Something went wrong. Try again.");
            setChangeSuccess(false);
          }
          return status;
        })
        .then(status => {
          if (status === 200) {
            refreshCompanies();
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
          <Heading size="md">Add new company</Heading>
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
            <HStack spacing={4} alignItems="stretch" width="100%">
              <Input
                placeholder="New company name"
                value={newCompanyName}
                onChange={handleInputChange}
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
                    ? `Successful adding new company.`
                    : `There was a problem with adding new company "${newCompanyName}".`}
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
