import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ButtonWithIcon } from "../../layout/button-with-icon";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";
import { UIProps } from "../../../config/config";

interface IFilterSectionButtonsProps {
  setFilterEnabled: () => void;
  setDeviceIdFilter: (val: string) => void;
  deviceIdFilter: string;
}

export const FilterSectionButtons = ({
  setFilterEnabled,
  setDeviceIdFilter,
  deviceIdFilter,
}: IFilterSectionButtonsProps) => {
  const ui = UIProps;

  return (
    <HStack spacing={4} align="center">
      <ButtonWithIcon
        text="Sort"
        icon={<FilterListIcon />}
        onClick={() => {}}
        props={{ fontSize: "14px", size: "md" }}
      />
      <ButtonWithIcon
        text="Filter"
        icon={<FilterAltOutlinedIcon />}
        onClick={setFilterEnabled}
        props={{ fontSize: "14px", size: "md" }}
      />
      <InputGroup width="200px">
        <InputLeftElement>
          <NumbersIcon />
        </InputLeftElement>
        <Input
          placeholder="Device ID"
          focusBorderColor={ui.colors.primary}
          bg={ui.colors.secondary}
          color="black"
          _placeholder={{ opacity: 0.4, color: "black" }}
          value={deviceIdFilter}
          onChange={(e) => setDeviceIdFilter(e.target.value)}
        />
      </InputGroup>
    </HStack>
  );
};
