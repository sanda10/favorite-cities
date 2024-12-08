import { Box, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@chakra-ui/react";

export default function NavBar() {
  const { data: session } = useSession();

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

        <div>
          {session ? (
            <Button onClick={() => signOut()} colorScheme="red">
              Sign Out
            </Button>
          ) : (
            <Button onClick={() => signIn()} colorScheme="teal">
              Sign In
            </Button>
          )}
        </div>
      </Flex>
    </Box>
  );
}
