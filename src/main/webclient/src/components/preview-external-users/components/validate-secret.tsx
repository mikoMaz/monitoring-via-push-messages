import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { UIProps } from "../../../config/config";
import { APIClient } from "../../../api/api-client";

export interface IValidateSectet {
  apiClient: APIClient;
  context: string;
  setSecret: (secret: string) => void;
}

export const ValidateSecret = ({
  apiClient,
  context,
  setSecret,
}: IValidateSectet) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [errorModalActive, setErrorModalActive] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const handleChange = (event: any) => setInputValue(event.target.value);

  const validateSecret = async (secret: string) => {
    setButtonLoading(true);
    setErrorModalActive(false);
    const result = await apiClient.validatePreviewSecret(secret, context);
    if (result) {
      setSecret(secret);
    } else {
      setErrorModalActive(true);
      setInputValue("");
    }
    setButtonLoading(false);
  };

  return (
    <Center marginTop="100px">
      <VStack>
        <Heading size="md">To access {context} provide the secret</Heading>
        <HStack>
          <Input
            pr="4.5rem"
            type="password"
            placeholder="Enter secret"
            value={inputValue}
            onChange={handleChange}
            size="lg"
          />
          <Button
            isLoading={buttonLoading}
            loadingText="Validating"
            onClick={async () => await validateSecret(inputValue)}
            color="white"
            bg={UIProps.colors.primary}
            spinnerPlacement="end"
          >
            Validate
          </Button>
        </HStack>
        {errorModalActive && (
          <Alert
            status="error"
            variant="left-accent"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginY={4}
          >
            <Box display="flex" alignItems="center">
              <AlertIcon />
              <Box ml={2}>
                <AlertTitle>{"Error!"}</AlertTitle>
                <AlertDescription>
                  {"Secret validation failed."}
                </AlertDescription>
              </Box>
            </Box>
          </Alert>
        )}
      </VStack>
    </Center>
  );
};
