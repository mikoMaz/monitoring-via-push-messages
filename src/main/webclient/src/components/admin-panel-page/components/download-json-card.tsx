import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  IconButton,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { UIProps } from "../../../config/config";
import { useState } from "react";
import {
  Download,
  InfoOutlined,
  UnfoldLess,
  UnfoldMore,
} from "@mui/icons-material";
import { ICompanyDto } from "../../../types/ICompanyDto";
import saveAs from "file-saver";

export const DownloadFileCard = ({
  companies,
}: {
  companies: ICompanyDto[];
}) => {
  const [cardFold, setCardFold] = useState<boolean>(true);

  const downloadCompanies = () => {
    try {
      const blob = new Blob([JSON.stringify(companies, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, "companies.json");
    } catch (error) {
      console.error("Error generating JSON:", error);
    }
  };

  return (
    <Card variant="filled" bg="whiteAlpha.600">
      <CardHeader>
        <HStack justify="space-between" alignItems="center">
          <Heading size="md">Download files</Heading>
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
        <CardBody>
          <VStack spacing={8} justifyContent="flex-end">
            <HStack spacing={12} align="center">
              <HStack spacing={4} align="center">
                <Tooltip
                  label={"Download JSON file with companyId and companyName"}
                  bg="gray.100"
                  color="gray.500"
                  placement="left"
                >
                  <InfoOutlined style={{ color: UIProps.colors.accent }} />
                </Tooltip>
                <Heading size="sm">Your companies information:</Heading>
              </HStack>
              <Button
                colorScheme="primary"
                onClick={downloadCompanies}
                leftIcon={<Download />}
              >
                Download
              </Button>
            </HStack>
          </VStack>
        </CardBody>
      )}
    </Card>
  );
};
