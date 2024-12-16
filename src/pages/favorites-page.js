import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  ListItem,
  ListRoot,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const [ratingInput, setRatingInput] = useState(0);

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

    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              city: "User Location",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            setFavorites((prevFavorites) => [...prevFavorites, userLocation]);
            localStorage.setItem(
              "favorites",
              JSON.stringify([
                ...JSON.parse(localStorage.getItem("favorites") || "[]"),
                userLocation,
              ])
            );
          },
          (error) => {
            console.error("Error getting user location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchFavorites();
    fetchUserLocation();
  }, []);

  const handleAddReview = (index) => {
    const updatedFavorites = [...favorites];
    const favorite = updatedFavorites[index];
    if (!favorite.reviews) {
      favorite.reviews = [];
    }
    favorite.reviews.push({ review: reviewInput, rating: ratingInput });
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setReviewInput("");
    setRatingInput(0);
  };

  const handleShare = (favorite) => {
    const shareData = {
      title: "Check out this destination!",
      text: `Explore ${favorite.cityName || favorite.city || "this location"}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Destination shared successfully.");
        })
        .catch((error) => {
          console.error("Error sharing destination:", error);
        });
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

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

                <Button
                  mt={2}
                  colorScheme="blue"
                  onClick={() => handleShare(favorite)}
                >
                  Share this Destination
                </Button>

                <VStack mt={4} spacing={2} align="stretch">
                  {favorite.reviews &&
                    favorite.reviews.map((review, i) => (
                      <Box key={i} p={2} borderRadius="md" bg="orange.100">
                        <Text>
                          <strong>Rating:</strong> {review.rating} / 5
                        </Text>
                        <Text>
                          <strong>Review:</strong> {review.review}
                        </Text>
                      </Box>
                    ))}

                  <Input
                    placeholder="Write a review"
                    value={reviewInput}
                    onChange={(e) => setReviewInput(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={ratingInput}
                    onChange={(e) => setRatingInput(e.target.value)}
                    max={5}
                    min={1}
                  />
                  <Button onClick={() => handleAddReview(index)}>
                    Add Review
                  </Button>
                </VStack>
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
