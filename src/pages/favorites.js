import { useEffect, useState, useCallback } from "react";
import { Box, Heading, Text, VStack, Button, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import PropTypes from "prop-types";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulează preluarea datelor dintr-un API sau localStorage
  const fetchFavorites = useCallback(async () => {
    try {
      // Exemplu: Fetch dintr-un API local sau cloud
      const response = await fetch("/api/favorites");
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Eroare la încărcarea favoritelor:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text>Încărcăm lista ta de favorite...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="800px" mx="auto" py={10} px={6}>
      <Heading size="3xl">Favorites Page</Heading>
      {favorites.length === 0 ? (
        <Text mt="3.5" bg="purple.500" color="white" p="10px 20px">
          This is the favorites page <br />
          <Link href="/search" passHref>
            <Button mt={4} colorScheme="teal">
              Caută orașe
            </Button>
          </Link>
        </Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {favorites.map((city) => (
            <Box
              key={city.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              shadow="md"
            >
              <Heading as="h2" size="md" mb={2}>
                {city.name}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                Latitudine: {city.latitude}, Longitudine: {city.longitude}
              </Text>
              <Link href={`/city/${city.id}`} passHref>
                <Button mt={3} colorScheme="teal">
                  Vezi detalii
                </Button>
              </Link>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
}

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
};
