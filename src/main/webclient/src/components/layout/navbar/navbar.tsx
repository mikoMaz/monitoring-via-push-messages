import { Grid, GridItem } from "@chakra-ui/react";
import { NavigationButtons } from "./components/navigation-buttons/navigation-buttons";
import { UserSidebar } from "./components/user-sidebar/user-sidebar";
import { Logo } from "./components/logo/logo";
import { IUIProps } from "../../app-main/app-main";

export const Navbar = ({ ...ui }: IUIProps) => {
  return (
    <Grid
      templateColumns="1fr 1fr 21fr 6fr 2fr"
      gap={2}
      background={ui.colors.background}
      padding="10px"
      height={ui.heigth.navbar}
    >
      <GridItem>
        <Logo />
      </GridItem>
      <GridItem>
        <div className="navbar-empty-space" />
      </GridItem>
      <GridItem>
        <div className="navbar-empty-space" />
      </GridItem>
      <GridItem>
        <NavigationButtons {...ui} />
      </GridItem>
      <GridItem>
        <UserSidebar {...ui} />
      </GridItem>
    </Grid>
  );
};
