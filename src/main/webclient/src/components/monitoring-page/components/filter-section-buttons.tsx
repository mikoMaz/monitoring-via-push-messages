import { Button, Grid, GridItem } from "@chakra-ui/react";
import { ButtonWithIcon } from "../../layout/button-with-icon";
import { IUIProps } from "../../app-main/app-main";

interface IFilterSectionButtonsProps {
  ui: IUIProps
}

export const FilterSectionButtons = ({ui}: IFilterSectionButtonsProps) => {
  return (
    <Grid templateColumns="2fr 1fr 2fr 1fr 2fr">
      <GridItem>
        <ButtonWithIcon text="Sort" icon={<></>} ui={ui}/>
        {/* <Button>test</Button> */}
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
