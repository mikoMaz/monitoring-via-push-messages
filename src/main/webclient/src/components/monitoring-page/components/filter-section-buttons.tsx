import {
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Switch,
} from "@chakra-ui/react";
import { ButtonWithIcon } from "../../layout/button-with-icon";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";
import { UIProps } from "../../../config/config";

interface IFilterSectionButtonsProps {
  setFilterEnabled: () => void;
  inactiveDevicesSwitched: () => void;
  setDeviceIdFilter: (val: string) => void;
  inactiveSwitchEnabled: boolean;
  deviceIdFilter: string;
}

export const FilterSectionButtons = ({
  setFilterEnabled,
  inactiveDevicesSwitched,
  setDeviceIdFilter,
  inactiveSwitchEnabled,
  deviceIdFilter,
}: IFilterSectionButtonsProps) => {
  const ui = UIProps;
  
  return (
    <HStack spacing={4} align="center">
      <FormControl display="flex" alignItems="center" width="auto" marginEnd={6}>
        <FormLabel htmlFor="inactive-switch" mb={1} mr={4}>
          Inactive only
        </FormLabel>
        <Switch
          id="inactive-switch"
          isChecked={inactiveSwitchEnabled}
          colorScheme="primary"
          onChange={(e) => {
            inactiveDevicesSwitched();
          }}
        />
      </FormControl>
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
