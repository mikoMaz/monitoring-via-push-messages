import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";
import { IAppProps } from "../../types/projectTypes";
import { Routes } from "react-router-dom";
import { Suspense } from "react";
import { UIProps } from "../../config/config";

export const AppBody = ({ ...props }: IAppProps) => {
  const ui = UIProps;
  return (
    <Grid
      templateAreas={`"header header"
	"main main"
	"footer footer"`}
      gridTemplateRows={`${ui.heigth.navbar} 1fr ${ui.heigth.footer}`}
      background="background"
    >
      <GridItem area={"header"}>
        <Navbar {...props} />
      </GridItem>
      <GridItem area={"main"}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>{props.routes}</Routes>
        </Suspense>
      </GridItem>
    </Grid>
  );
};
