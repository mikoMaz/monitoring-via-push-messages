import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
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
  inactiveSwitchEnabled: boolean;
}

const GridEmptySpace = () => {
  return (
    <GridItem>
      <div className="empty-space" />
    </GridItem>
  );
};

export const FilterSectionButtons = ({
  setFilterEnabled,
  inactiveDevicesSwitched,
  inactiveSwitchEnabled,
}: IFilterSectionButtonsProps) => {
  const ui = UIProps;
  return (
    <Grid templateColumns="3fr 1fr 2fr 1fr 2fr 1fr 3fr">
      <GridItem>
        <FormControl display='flex' alignItems="center" marginTop="2">
          <FormLabel htmlFor="inactive-switch"  mb="0">
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
      </GridItem>
      <GridEmptySpace />
      <GridItem>
        <ButtonWithIcon
          text="Sort"
          icon={<FilterListIcon />}
          onClick={() => {}}
          props={{ fontSize: "14px", size: "md" }}
        />
      </GridItem>
      <GridEmptySpace />
      <GridItem>
        <ButtonWithIcon
          text="Filter"
          icon={<FilterAltOutlinedIcon />}
          onClick={setFilterEnabled}
          props={{ fontSize: "14px", size: "md" }}
        />
      </GridItem>
      <GridEmptySpace />
      <GridItem>
        <InputGroup>
          <InputLeftElement>
            <NumbersIcon />
          </InputLeftElement>
          <Input
            placeholder="Device ID"
            focusBorderColor={ui.colors.primary}
            bg={ui.colors.secondary}
            color="black"
            _placeholder={{ opacity: 0.4, color: "black" }}
          />
        </InputGroup>
      </GridItem>
    </Grid>
  );
};
