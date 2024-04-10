import { Button } from "@chakra-ui/react";
import "./example-button.css"

interface IExampleButtonProps {
  name: string;
  isLoading: boolean;
}

export const ExampleButton = ({ name, isLoading }: IExampleButtonProps) => {
  return <Button isLoading={isLoading}>{name}</Button>;
};
