import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";
import { ProjectColorsDictionary } from "../../types/projectTypes";
import { Routes } from "react-router-dom";
import { Suspense } from "react";

export interface IAppMainProps {
  ui: IUIProps;
  routes: JSX.Element[];
}
export interface IUIProps {
  colors: ProjectColorsDictionary;
  heigth: {
    navbar: string;
    footer: string;
  }
}

export const AppMain = ({ ...props }: IAppMainProps) => {

  return (
    <Grid
      templateAreas={`"header header"
	"main main"
	"footer footer"`}
      gridTemplateRows={`${props.ui.heigth.navbar} 1fr ${props.ui.heigth.footer}`}
    >
      <GridItem area={"header"}>
        <Navbar {...props.ui} />
      </GridItem>
      <GridItem area={"main"}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{props.routes}</Routes>
        </Suspense>
      </GridItem>
    </Grid>
  );
};
