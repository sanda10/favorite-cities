import {
  Box,
  Container,
  Heading,
  ListItem,
  ListRoot,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function favoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("/api/favorites");
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites.");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
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
          Your Favorites Destinations
        </Heading>
        {favorites.length > 0 ? (
          <ListRoot spacing={3} mt={4} textAlign="left">
            {favorites.map((favorite) => (
              <ListItem
                key={favorite.id}
                border="1px"
                borderColor="orange.300"
                borderRadius="md"
                p={3}
                bg="yellow.50"
                _hover={{ bg: "yellow.100", boxShadow: "md" }}
              >
                <Text fontWeight="bold" color="orange.600">
                  {favorite.cityName}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {favorite.country}
                </Text>
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
