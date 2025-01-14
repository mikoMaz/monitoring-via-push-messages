import {
  HStack,
  Tooltip,
  Heading,
  Text,
  IconButton,
  VStack,
  Alert,
  AlertIcon,
  Box,
  AlertDescription,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { InfoOutlined, Send, Upload } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { APIClient } from "../../../api/api-client";

export const FileSender = ({
  title,
  label,
  type,
  apiClient,
  accessToken,
}: {
  title: string;
  label: string;
  type: string;
  apiClient: APIClient;
  accessToken: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("No file detected");
  const [file, setFile] = useState<File>();
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [alertInfoExpanded, setAlertInfoExpanded] = useState<boolean>(false);
  const [fileAlert, setFileAlert] = useState<boolean>(false);
  const [tableName, setTableName] = useState<string>("Table Name");

  useEffect(() => {
    if (type === "device") {
      setTableName("device-table");
    } else if (type === "hierarchy") {
      setTableName("hierarchy-table");
    } else if (type === "alert") {
      setTableName("alert-table");
    }
  }, [type]);

  const handleSendClick = async (
    type: string,
    tableName: string,
    file?: File
  ) => {
    if (!file) {
      setFileAlert(true);
      return;
    }

    setIsLoading(true);

    if (type === "device" || "hierarchy") {
      await apiClient
        .postCSVData(accessToken, type, tableName, file)
        .then((response) => {
          if (response === 200) {
            setFileName("No file detected");
            setUploadSuccess(true);
            setFile(undefined);
          }
        })
        .catch((error) => {
          setUploadSuccess(false);
          console.error("Error uploading file:", error);
        })
        .finally(() => {
          setIsLoading(false);
          setAlertInfoExpanded(true);
        });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000))
        .then(() => {
          console.log("then ", uploadSuccess);
          setFileName("No file detected");
          setFile(undefined);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        })
        .finally(() => {
          setIsLoading(false);
          setAlertInfoExpanded(true);
        });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileAlert(false);
    }
  };

  return (
    <VStack>
      <HStack spacing={4} align="center">
        <Tooltip label={label} bg="gray.100" color="gray.500" placement="left">
          <InfoOutlined style={{ color: UIProps.colors.accent }} />
        </Tooltip>
        <Heading size="sm" w="100px">
          {title}:
        </Heading>
        <Text w="200px">{fileName}</Text>
        <Tooltip label="Upload" aria-label="Upload tooltip">
          <IconButton
            icon={<Upload />}
            colorScheme="primary"
            onClick={() => document.getElementById(title)?.click()}
            aria-label="Upload"
          />
        </Tooltip>
        <input
          type="file"
          id={title}
          style={{ display: "none" }}
          accept=".csv"
          onChange={handleFileChange}
        />
        <Tooltip label="Send" aria-label="Send tooltip">
          <IconButton
            icon={<Send />}
            colorScheme="primary"
            aria-label="Send"
            isLoading={isLoading}
            onClick={() => handleSendClick(type, tableName, file)}
          />
        </Tooltip>
      </HStack>
      {fileAlert && (
        <Alert
          status="warning"
          variant="left-accent"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginY={4}
        >
          <Box display="flex" alignItems="center">
            <AlertIcon />
            <Box ml={2}>
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                Please select a file before sending.
              </AlertDescription>
            </Box>
          </Box>
          <CloseButton onClick={() => setFileAlert(false)} />
        </Alert>
      )}
      {alertInfoExpanded && (
        <Alert
          status={uploadSuccess ? "success" : "error"}
          variant="left-accent"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginY={4}
        >
          <Box display="flex" alignItems="center">
            <AlertIcon />
            <Box ml={2}>
              <AlertTitle>{uploadSuccess ? "Success!" : "Error!"}</AlertTitle>
              <AlertDescription>
                {uploadSuccess
                  ? "Your file has been sended."
                  : "There was problem with sending your file."}
              </AlertDescription>
            </Box>
          </Box>
          <CloseButton
            onClick={() => {
              setAlertInfoExpanded(false);
              setUploadSuccess(false);
            }}
          />
        </Alert>
      )}
    </VStack>
  );
};
