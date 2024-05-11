import { Grid, GridItem, Image } from "@chakra-ui/react";
import { NavigationButtons } from "./components/navigation-buttons/navigation-buttons";
import { UserDropdown } from "./components/user-dropdown/user-dropdown";

export const Navbar = () => {
  return (
    <Grid templateColumns="1fr 1fr 5fr 2fr 2fr" gap={2}>
      <GridItem>
        <Image src="/public/img/logo192.png" alt="Logo" />
      </GridItem>
      <GridItem>
        <div>Name</div>
      </GridItem>
      <GridItem>
		<div className="navbar-empty-space"/>
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
