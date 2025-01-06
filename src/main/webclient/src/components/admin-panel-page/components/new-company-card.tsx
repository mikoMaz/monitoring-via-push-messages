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
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { APIClient } from "../../../api/api-client";
import { IUserInfoResponse } from "../../../types/IUserInfoResponse";
import { UIProps } from "../../../config/config";
import { useEffect, useState } from "react";
import { ICompanyDto } from "../../../types/ICompanyDto";

export const NewCompanyCard = ({
  apiClient,
  userInfo,
  accessToken,
}: {
  apiClient: APIClient;
  userInfo: IUserInfoResponse;
  accessToken: string;
}) => {
  const [newCompanyName, setNewCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [changeSuccess, setChangeSuccess] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<boolean>(false);
  const [cardFold, setCardFold] = useState<boolean>(true);

  const handleInputChange = (event: any) => {
    setNewCompanyName(event.target.value);
  };

  const handleSubmit = () => {
    if (newCompanyName) {
      setIsLoading(true);
      apiClient
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
                    ? `Successful adding new company "${newCompanyName}".`
                    : `There was a problem with adding new company "${newCompanyName}". Try again.`}
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
