import { HStack, Tooltip, Heading, Text, IconButton } from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { InfoOutlined, Send, Upload } from "@mui/icons-material";

export const FileSender = ({
  title,
  label,
  fileName,
  handleFileChange,
}: {
  title: string;
  label: string;
  fileName: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <HStack spacing={4} align="center">
      <Tooltip label={label} bg="gray.100" color="gray.500" placement="left">
        <InfoOutlined style={{ color: UIProps.colors.accent }} />
      </Tooltip>
      <Heading size="sm" w="120px">
        {title}:
      </Heading>
      <Text flex="1">{fileName}</Text>
      <Tooltip label="Upload" aria-label="Upload tooltip">
        <IconButton
          icon={<Upload />}
          colorScheme="primary"
          onClick={() => document.getElementById("file-input")?.click()}
          aria-label="Upload"
        />
      </Tooltip>
      <input
        type="file"
        id="file-input"
        style={{ display: "none" }}
        accept=".csv"
        onChange={handleFileChange}
      />
      <Tooltip label="Send" aria-label="Send tooltip">
        <IconButton icon={<Send />} colorScheme="primary" aria-label="Send" />
      </Tooltip>
    </HStack>
  );
};
