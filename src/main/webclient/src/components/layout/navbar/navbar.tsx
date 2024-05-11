import { Grid, GridItem } from "@chakra-ui/react";
import { NavigationButtons } from "./components/navigation-buttons/navigation-buttons";
import { UserDropdown } from "./components/user-dropdown/user-dropdown";
import { Logo } from "./components/logo/logo";

export const Navbar = () => {
  return (
    <Grid templateColumns="1fr 1fr 5fr 2fr 2fr" gap={2}>
      <GridItem>
        <Logo />
      </GridItem>
      <GridItem>
        <div>Name</div>
      </GridItem>
      <GridItem>
        <div className="navbar-empty-space" />
      </GridItem>
      <GridItem>
        <NavigationButtons />
      </GridItem>
      <GridItem>
        <UserDropdown />
      </GridItem>
    </Grid>
  );
};
