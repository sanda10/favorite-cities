import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";

export default function MenuBar() {
  const menuItemStyles = {
    borderWidth: "1px",
    borderColor: "purple.500",
    m: "1",
    justifyContent: "Center",
    _hover: {
      bg: "purple.500",
      color: "white",
    },
  };

  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          size="5m"
          variant="solid"
          colorPalette="purple"
          m="5"
          p="10px 20px"
          _hover={{ color: "colorPalette.800" }}
        >
          MenuBar
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild value="homepage" css={menuItemStyles}>
          <Link href="/">Home page</Link>
        </MenuItem>
        <MenuItem asChild value="search-page" css={menuItemStyles}>
          <Link href="/search">Search page</Link>
        </MenuItem>
        <MenuItem asChild value="city-page" css={menuItemStyles}>
          <Link href="/city-page">City page</Link>
        </MenuItem>
        <MenuItem asChild value="favorites" css={menuItemStyles}>
          <Link href="/favorites">Favorites</Link>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}
