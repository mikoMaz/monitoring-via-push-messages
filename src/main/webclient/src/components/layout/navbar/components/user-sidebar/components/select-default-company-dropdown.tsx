import { Select, VStack, Text, Card } from "@chakra-ui/react";
import { IUserInfoResponse } from "../../../../../../types/IUserInfoResponse";
import { ICompanyDto } from "../../../../../../types/ICompanyDto";
import { useEffect, useState } from "react";

export const SelectDefaultCompany = ({
  userInfo,
  companies,
  setDefaultCompany,
  defaultCompany,
}: {
  userInfo: IUserInfoResponse;
  companies: ICompanyDto[];
  setDefaultCompany: (company?: ICompanyDto) => void;
  defaultCompany: ICompanyDto | undefined;
}) => {
  const placeholder = "Select company";
  const [companySelect, setCompanySelect] = useState<string>();

  const handleCompanyChange = (event: any) => {
    const chosenCompany = event.target.value.toString();
    setCompanySelect(chosenCompany);
    if (chosenCompany && chosenCompany !== placeholder) {
      setDefaultCompany(
        companies.find((comp) => {
          return comp.companyId.toString() === chosenCompany;
        })
      );
    }
  };

  useEffect(() => {
    if (defaultCompany) {
      setCompanySelect(defaultCompany.companyId.toString());
    }
  }, [defaultCompany]);

  return ["SUPER_ADMIN"].includes(userInfo.userType) && companies.length ? (
    <VStack spacing={4} paddingY={4}>
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
  ) : (
    <></>
  );
};
