import {
  Alert,
  AlertIcon,
  AlertTitle,
  UseToastOptions,
} from "@chakra-ui/react";

export const getToastOptions = (devicesCount: number, onClick: () => void) => {
  const config: UseToastOptions = {
    status: "error",
    title: `${devicesCount} devices are inactive!`,
    position: "top",
    isClosable: true,
    render: () => (
      <Alert status="error" variant="solid" onClick={onClick}>
        <AlertIcon />
        <AlertTitle>{`${devicesCount} devices is inactive!`}</AlertTitle>
      </Alert>
    ),
  };
  return config;
};
