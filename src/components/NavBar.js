import { Box, Flex } from "@chakra-ui/react";
import NextLink from "next/link";

export default function NavBar() {
  return (
    <Box as="nav" bg="blue.700" p={4}>
      <Flex justify="space-around" color="white">
        <NextLink href="/" passHref>
          <p>Homepage</p>
        </NextLink>
        <NextLink href="/search" passHref>
          <p>Search</p>
        </NextLink>
        <NextLink href="/city-page" passHref>
          <p>City</p>
        </NextLink>
        <NextLink href="/favorites-page" passHref>
          <p>Favorites</p>
        </NextLink>
      </Flex>
    </Box>
  );
}
