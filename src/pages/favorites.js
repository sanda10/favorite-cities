// pages/favorites.js
import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Button, Spinner } from "@chakra-ui/react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulează preluarea datelor dintr-un API sau localStorage
  useEffect(() => {
    async function fetchFavorites() {
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
    }

    fetchFavorites();
  }, []);

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
      <Heading as="h1" size="xl" mb={6}>
        Orașe Favorite
      </Heading>
      {favorites.length === 0 ? (
        <Text fontSize="lg" color="gray.600">
          Nu ai niciun oraș salvat în lista ta de favorite. <br />
          <Link href="/search" passHref>
            <Button mt={4} p="10px 20px" colorScheme="teal">
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
                <Button mt={3} p="10px 20px" colorScheme="teal">
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
