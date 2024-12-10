import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Heading,
  ListItem,
  ListRoot,
  Text,
  VStack,
} from "@chakra-ui/react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Load favorite cities from API and user location from localStorage on page load
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        if (response.ok) {
          const apiFavorites = await response.json();
          const savedFavorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
          );
          const combinedFavorites = [...apiFavorites, ...savedFavorites];
          setFavorites(combinedFavorites);
        } else {
          console.error("Failed to fetch favorites from API.");
        }
      } catch (error) {
        console.error("Error fetching favorites from API:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Container
      py="6"
      minH="100vh"
      bg="orange.50"
      borderRadius="lg"
      boxShadow="xl"
      centerContent
    >
      <Box
        textAlign="center"
        p={6}
        borderRadius="md"
        bg="yellow.100"
        boxShadow="lg"
      >
        <Heading size="xl" color="orange.600" mb={4}>
          Your Favorite Destinations
        </Heading>
        {favorites.length > 0 ? (
          <ListRoot spacing={3} mt={4} textAlign="left">
            {favorites.map((favorite, index) => (
              <ListItem
                key={index}
                border="1px"
                borderColor="orange.300"
                borderRadius="md"
                p={3}
                bg="yellow.50"
                _hover={{ bg: "yellow.100", boxShadow: "md" }}
              >
                <Text fontWeight="bold" color="orange.600">
                  {favorite.cityName || favorite.city || "Unknown City"}
                </Text>
                {favorite.country && (
                  <Text fontSize="sm" color="gray.600">
                    {favorite.country}
                  </Text>
                )}
                {favorite.latitude && favorite.longitude && (
                  <>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Latitude:</strong> {favorite.latitude}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      <strong>Longitude:</strong> {favorite.longitude}
                    </Text>
                  </>
                )}
              </ListItem>
            ))}
          </ListRoot>
        ) : (
          <Text fontSize="lg" color="orange.600" mt={4}>
            No favorite destinations yet.
          </Text>
        )}
      </Box>
    </Container>
  );
}
