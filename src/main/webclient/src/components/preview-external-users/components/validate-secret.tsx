import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { UIProps } from "../../../config/config";

export interface IValidateSectet {
  context: string;
  setSecret: (secret: string) => void;
}

export const ValidateSecret = ({ context, setSecret }: IValidateSectet) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (event: any) => setValue(event.target.value);

  return (
    <Center marginTop="100px">
      <Stack>
        <Heading size="md">To access {context} provide the secret</Heading>
        <HStack>
          <Input
            pr="4.5rem"
            type="password"
            placeholder="Enter secret"
            value={value}
            onChange={handleChange}
            size="lg"
          />
          <Button
            onClick={() => setSecret(value)}
            color="white"
            bg={UIProps.colors.primary}
          >
            Validate
          </Button>
        </HStack>
      </Stack>
    </Center>
  );
};
