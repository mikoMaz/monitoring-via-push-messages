import { Button, Grid, GridItem } from "@chakra-ui/react";
import { ButtonWithIcon } from "../../layout/button-with-icon";
import { IUIProps } from "../../app-main/app-main";
import FilterListIcon from '@mui/icons-material/FilterList';


interface IFilterSectionButtonsProps {
  ui: IUIProps
}

export const FilterSectionButtons = ({ui}: IFilterSectionButtonsProps) => {
  return (
    <Grid templateColumns="2fr 1fr 2fr 1fr 2fr">
      <GridItem>
        <ButtonWithIcon text="Sort" icon={<FilterListIcon/>} ui={ui}/>
      </GridItem>
      <GridItem>
        <div className="empty-space"/>
      </GridItem>
      <GridItem>
        test
      </GridItem>
      <GridItem>
        <div className="empty-space"/>
      </GridItem>
      <GridItem>
        test
      </GridItem>
    </Grid>
  );
};
