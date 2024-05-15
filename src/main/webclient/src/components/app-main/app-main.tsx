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
}

export const AppMain = ({ ...props }: IAppMainProps) => {

  return (
    <Grid
      templateAreas={`"header header"
	"main main"
	"footer footer"`}
      gridTemplateRows={"150px 1fr 100px"}
    >
      <GridItem area={"header"}>
        <Navbar {...props.ui} />
      </GridItem>
      <GridItem area={"main"}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{props.routes}</Routes>
        </Suspense>
      </GridItem>
      <GridItem area={"footer"}>Footer</GridItem>
    </Grid>
  );
};
