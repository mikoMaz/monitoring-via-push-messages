import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";
import { ProjectColorsDictionary } from "../../types/projectTypes";

export interface IAppMainProps {
  ui: IUIProps
}

export interface IUIProps {
  colors: ProjectColorsDictionary;
}

const appMainProps: IAppMainProps = {
  ui: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      primary: "#22543D",
      secondary: "#9AE6B4",
      accent: "#CBD5E0",
      background: "#F4F3F0",
    },
  },
};

export const AppMain = ({...appMainProps}: IAppMainProps) => {
  return (
    <Grid
      templateAreas={`"header header"
	"main main"
	"footer footer"`}
      gridTemplateRows={"150px 1fr 100px"}
    >
      <GridItem area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem area={"main"}>Main</GridItem>
      <GridItem area={"footer"}>Footer</GridItem>
    </Grid>
  );
};
