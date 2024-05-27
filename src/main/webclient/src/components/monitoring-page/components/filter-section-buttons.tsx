import {
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ButtonWithIcon } from "../../layout/button-with-icon";
import { IUIProps } from "../../app-main/app-main";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import NumbersIcon from "@mui/icons-material/Numbers";

interface IFilterSectionButtonsProps {
  ui: IUIProps;
  setFilterEnabled: () => void;
}

export const FilterSectionButtons = ({ ui, setFilterEnabled }: IFilterSectionButtonsProps) => {
  return (
    <Grid templateColumns="2fr 1fr 2fr 1fr 3fr">
      <GridItem>
        <ButtonWithIcon
          text="Sort"
          icon={<FilterListIcon />}
          onClick={() => {}}
          props={{ fontSize: "14px", size: "md" }}
        />
      </GridItem>
      <GridItem>
        <div className="empty-space" />
      </GridItem>
      <GridItem>
        <ButtonWithIcon
          text="Filter"
          icon={<FilterAltOutlinedIcon />}
          onClick={setFilterEnabled}
          props={{ fontSize: "14px", size: "md" }}
        />
      </GridItem>
      <GridItem>
        <div className="empty-space" />
      </GridItem>
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
            _placeholder={{ opacity: 0.4, color: "black"}}
          />
        </InputGroup>
      </GridItem>
    </Grid>
  );
};
