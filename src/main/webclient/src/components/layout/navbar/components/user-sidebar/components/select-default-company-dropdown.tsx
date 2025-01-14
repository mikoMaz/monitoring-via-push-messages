import { Select, VStack, Text, Card } from "@chakra-ui/react";
import { IUserInfoResponse } from "../../../../../../types/IUserInfoResponse";
import { ICompanyDto } from "../../../../../../types/ICompanyDto";
import { useState } from "react";

export const SelectDefaultCompany = ({
  userInfo,
  companies,
  setDefaultCompany,
}: {
  userInfo: IUserInfoResponse;
  companies: ICompanyDto[];
  setDefaultCompany: (company?: ICompanyDto) => void;
}) => {
  const placeholder = "Select company";
  const [companySelect, setCompanySelect] = useState<string>();

  const handleCompanyChange = (event: any) => {
    const chosenCompany = event.target.value.toString();
    setCompanySelect(chosenCompany);
    if (chosenCompany && chosenCompany !== placeholder) {
      setDefaultCompany(
        companies.find((comp) => comp.companyName === chosenCompany)
      );
    }
  };

  return ["SUPER_ADMIN"].includes(userInfo.userType) && companies.length ? (
    <Card padding={2}>
      <VStack>
        <Text>Select the default company</Text>
        <Select
          placeholder={placeholder}
          value={companySelect}
          onChange={handleCompanyChange}
          bg="transparent"
          border="none"
          _hover={{
            bg: "green.50",
          }}
          _focus={{
            boxShadow: "none",
            bg: "green.50",
          }}
          _active={{
            bg: "green.50",
          }}
        >
          {companies.map((company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.companyName}
            </option>
          ))}
        </Select>
      </VStack>
    </Card>
  ) : (
    <></>
  );
};
