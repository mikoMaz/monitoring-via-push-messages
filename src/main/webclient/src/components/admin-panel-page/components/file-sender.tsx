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
import { useState } from "react";
import axios from "axios";

export const FileSender = ({
  title,
  label,
  type,
  tableName,
}: {
  title: string;
  label: string;
  type?: string;
  tableName?: string;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("No file detected");
  const [file, setFile] = useState<File>();
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [alertInfoExpanded, setAlertInfoExpanded] = useState<boolean>(false);

  const handleSendClick = async (
    type: string,
    tableName: string,
    file?: File
  ) => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsLoading(true);
    // const formData = new FormData();
    // formData.append("type", type);
    // formData.append("tableName", tableName);
    // formData.append("file", file);

    await new Promise((resolve) => setTimeout(resolve, 2000))
      .then(() => {
        // setUploadSuccess(true);
        console.log("then ", uploadSuccess);
        setFileName("No file detected");
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setIsLoading(false);
        setAlertInfoExpanded(true);
      });

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/api/v1/upload-csv",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   if (response.status === 200) {
    //     alert("File uploaded successfully");
    //   } else {
    //     throw new Error("Failed to upload file");
    //   }
    // } catch (error) {
    //   console.error("Error uploading file:", error);
    //   alert("Failed to upload file");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
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
        <Text  w="250px">{fileName}</Text>
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
            onClick={() => handleSendClick(type ?? "", tableName ?? "", file)}
          />
        </Tooltip>
      </HStack>
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
              <AlertDescription>{uploadSuccess ? "Your file has been sended." : "There was problem with sending your file. Try again."}</AlertDescription>
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
