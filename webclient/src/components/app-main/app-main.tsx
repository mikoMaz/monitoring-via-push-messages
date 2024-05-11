import { Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../layout/navbar/navbar";

export interface IAppMainProps {}

export const AppMain = ({}: IAppMainProps) => {
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
