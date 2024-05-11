import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";
import { ProjectColorsDictionary } from "../../types/projectTypes";

export interface IAppMainProps {
  ui: IUIProps
}
export interface IUIProps {
  colors: ProjectColorsDictionary;
}

export const AppMain = ({...appMainProps}: IAppMainProps) => {
  return (
    <Grid
      templateAreas={`"header header"
	"main main"
	"footer footer"`}
      gridTemplateRows={"150px 1fr 100px"}
    >
      <GridItem area={"header"}>
        <Navbar {...appMainProps.ui}/>
      </GridItem>
      <GridItem area={"main"}>Main</GridItem>
      <GridItem area={"footer"}>Footer</GridItem>
    </Grid>
  );
};
